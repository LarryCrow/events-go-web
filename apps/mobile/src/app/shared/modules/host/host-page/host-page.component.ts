import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '@ego/common/core/models/event';
import { EventSearchFilters } from '@ego/common/core/models/event-search-filters';
import { Host } from '@ego/common/core/models/host';
import { EventsService } from '@ego/common/core/services/events.service';
import { FeedbackService } from '@ego/common/core/services/feedback.service';
import { HostsService } from '@ego/common/core/services/hosts.service';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, map } from 'rxjs/operators';

import { HostPopoverComponent } from '../components/host-popover/host-popover.component';

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
    private readonly popoverCtrl: PopoverController,
    private readonly feedbackService: FeedbackService,
  ) {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.host$ = this.initHostStream(id);
    this.events$ = this.initEventsStream();
    this.feedbackService.getHostFeedback(id)
      .subscribe((x) => console.log(x));
  }

  /**
   * Open popover
   */
  public async openPopover(event: any, host: Host): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: HostPopoverComponent,
      translucent: true,
      event: event,
      componentProps: { host },
    });
    popover.present();
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
