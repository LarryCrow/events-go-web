import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { shareReplay, switchMap, map } from 'rxjs/operators';
import { Event } from '@ego/common/core/models/event';
import { EventSearchFilters } from '@ego/common/core/models/event-search-filters';
import { Host } from '@ego/common/core/models/host';
import { EventsService } from '@ego/common/core/services/events.service';
import { HostsService } from '@ego/common/core/services/hosts.service';

/**
 * List of modes.
 */
enum ListMode {
  /** Display all events */
  All,
  /** Display upcoming events. */
  Upcoming,
}

/**
 * Host page.
 */
@Component({
  selector: 'ego-host-page',
  templateUrl: './host-page.component.html',
  styleUrls: ['./host-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostPageComponent {
  /**
   * Host.
   */
  public readonly host$: Observable<Host>;
  /**
   * Events list.
   */
  public readonly events$: Observable<Event[]>;
  /**
   * Control which items should be displayed.
   */
  public readonly listMode$ = new BehaviorSubject<ListMode>(ListMode.Upcoming);
  /**
   * Available modes.
   */
  public readonly modes = ListMode;

  /**
   * @constructor
   *
   * @param route Activated route.
   * @param hostService Host service.
   * @param eventService Event service.
   */
  public constructor(
    private readonly hostService: HostsService,
    private readonly route: ActivatedRoute,
    private readonly eventService: EventsService,
  ) {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.host$ = this.initHostStream(id);
    this.events$ = this.initEventsStream();
  }

  /**
   * Handle 'click' event of the 'Показат всё' button.
   */
  public toggleListMode(value: ListMode): void {
    this.listMode$.next(value);
  }

  private initHostStream(id: number): Observable<Host> {
    return this.hostService.getHost(id)
      .pipe(
        shareReplay({
          refCount: true,
          bufferSize: 1,
        }),
      );
  }

  private initEventsStream(): Observable<Event[]> {
    return combineLatest([
      this.host$,
      this.listMode$,
    ]).pipe(
      switchMap(([host, mode]) => this.eventService.getEvents(this.getSearchFilters(host.id, mode))),
      map((pagination) => pagination.items),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      }),
    );
  }

  private getSearchFilters(host_id: number, mode: ListMode): EventSearchFilters {
    return new EventSearchFilters({
      host_id: host_id,
      upcoming: mode === ListMode.Upcoming,
    });
  }
}
