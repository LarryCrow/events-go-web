import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '@ego/common/core/models/event';
import { EventSearchFilters } from '@ego/common/core/models/event-search-filters';
import { Host } from '@ego/common/core/models/host';
import { EventsService } from '@ego/common/core/services/events.service';
import { HostsService } from '@ego/common/core/services/hosts.service';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, map } from 'rxjs/operators';

/** Host page. */
@Component({
  selector: 'egom-host-page',
  templateUrl: './host-page.component.html',
  styleUrls: ['./host-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostPageComponent {
  /** Host. */
  public readonly host$: Observable<Host>;
  /** Events list. */
  public readonly events$: Observable<Event[]>;

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
    return this.host$
      .pipe(
        switchMap((host) => this.eventService.getEvents(this.getSearchFilters(host.id))),
        map((pagination) => pagination.items),
        shareReplay({
          refCount: true,
          bufferSize: 1,
        }),
      );
  }

  private getSearchFilters(hostId: number): EventSearchFilters {
    return new EventSearchFilters({
      host_id: hostId,
    });
  }
}
