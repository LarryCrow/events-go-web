import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Event } from 'src/app/core/models/event';
import { EventSearchFilters } from 'src/app/core/models/event-search-filters';
import { EventsService } from 'src/app/core/services/events.service';

/**
 * Page with a user events.
 */
@Component({
  selector: 'ego-my-events-page',
  templateUrl: './my-events-page.component.html',
  styleUrls: ['./my-events-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyEventsPageComponent {
  /**
   * Events
   */
  public readonly events$: Observable<Event[]>;

  public constructor(
    private readonly eventService: EventsService,
  ) {
    this.events$ = this.initEventsStream();
  }

  private initEventsStream(): Observable<Event[]> {
    return this.eventService.getMyEvents()
      .pipe(share());
  }
}
