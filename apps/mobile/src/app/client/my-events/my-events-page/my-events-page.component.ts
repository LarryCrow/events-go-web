import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Event } from '@ego/common/core/models/event';
import { EventsService } from '@ego/common/core/services/events.service';
import { isDateGreaterThan } from '@ego/common/shared/utils/date';
import { Observable, Subject } from 'rxjs';
import { share, map, startWith, switchMapTo, switchMap, first } from 'rxjs/operators';

/** Number of days to filter upcoming events */
const UPCOMING_FILTER_DAY = 5;

/** My events page. */
@Component({
  selector: 'egom-my-events-page',
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
  private readonly update$ = new Subject<void>();

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

  /**
   * Refresh page info.
   *
   * @param event Event.
   */
  public doRefresh(event: CustomEvent): void {
    this.update$.next();
    this.events$.pipe(first())
      // @ts-ignore the absence of `complete` on CustomEventTarget
      .subscribe(() => event.target.complete());
  }

  private initEventsStream(): Observable<Event[]> {
    return this.update$
      .pipe(
        startWith(null),
        switchMap(() => this.eventService.getMyEvents()),
        share(),
      );
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
