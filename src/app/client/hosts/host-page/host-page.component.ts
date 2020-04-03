import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { Event } from 'src/app/core/models/event';
import { Host } from 'src/app/core/models/host';
import { EventsService } from 'src/app/core/services/events.service';
import { HostsService } from 'src/app/core/services/hosts.service';

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
        switchMap((host) => this.eventService.getEvents({ hostId: host.id })),
        shareReplay({
          refCount: true,
          bufferSize: 1,
        }),
      );
  }
}
