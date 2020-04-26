import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { share, map } from 'rxjs/operators';
import { Event } from '@ego/common/core/models/event';
import { EventsService } from '@ego/common/core/services/events.service';
import { isDateGreaterThan } from '@ego/common/shared/utils/date';

/** Number of days to filter upcoming events */
const UPCOMING_FILTER_DAY = 5;

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
   * Upcoming events (less than 5 days)
   */
  public readonly upcomingEvents$: Observable<Event[]>;
  /**
   * Events with date greater than 5 days.
   */
  public readonly otherEvents$: Observable<Event[]>;

  private readonly events$: Observable<Event[]>;

  /**
   * @constructor
   *
   * @param eventService Event service.
   */
  public constructor(
    private readonly eventService: EventsService,
  ) {
    this.events$ = this.initEventsStream();
    this.upcomingEvents$ = this.initUpcomingEventsStream();
    this.otherEvents$ = this.initOtherEventsStream();
  }

  private initEventsStream(): Observable<Event[]> {
    return this.eventService.getMyEvents()
      .pipe(share());
  }

  private initUpcomingEventsStream(): Observable<Event[]> {
    return this.events$
      .pipe(
        map((events) => events.filter((event) => !isDateGreaterThan(event.start, UPCOMING_FILTER_DAY))),
      );
  }

  private initOtherEventsStream(): Observable<Event[]> {
    return this.events$
      .pipe(
        map((events) => events.filter((event) => isDateGreaterThan(event.start, UPCOMING_FILTER_DAY))),
      );
  }
}
