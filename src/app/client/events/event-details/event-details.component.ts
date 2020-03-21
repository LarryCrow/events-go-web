import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, switchMap, share, map } from 'rxjs/operators';

import { Event } from '../../../core/models/event';
import { MapOptions } from '../../../core/models/map-options';
import { Role } from '../../../core/models/role.enum';
import { DialogService } from '../../../core/services/dialog.service';
import { EventsService } from '../../../core/services/events.service';
import { UserService } from '../../../core/services/user.service';

const EVENT_CANCELED_MESSAGE = 'Простите, на данный момент мероприятие отменено. Но раз эта страница до сих пор существует, \
  организатор сказал, что событие ещё может быть проведено.';

const UNAUTHORIZED_SUBSCRIBE = 'Для того, чтобы подписаться на событие, вам необходимо авторизоватьcя.';
const INCORRECT_ROLE = 'Организатор не может подписываться на события.';

/**
 * Page with event details.
 */
@Component({
  selector: 'ego-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent {
  /**
   * Event.
   */
  public event$: Observable<Event>;

  /**
   * Is a user subscribed or not.
   */
  public isUserSubscribed = false;

  /**
   * Map options.
   */
  public mapOptions$: Observable<MapOptions>;

  public constructor(
    private readonly eventsService: EventsService,
    private readonly route: ActivatedRoute,
    private readonly dialogService: DialogService,
    private readonly userService: UserService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.event$ = this.eventsService.getEvent(id)
      .pipe(
        share(),
      );

    this.userService.currentUser$
      .pipe(
        first(),
        filter((user) => user && user.role === Role.Client),
        switchMap(() => this.event$),
        switchMap((event) => this.eventsService.isUserSubscribed(event.id)),
      )
      .subscribe((val) => this.isUserSubscribed = val);

    this.mapOptions$ = this.initMapOptionsStream(this.event$);
    this.isEventCanceled(this.event$);
  }

  /**
   * Handles click on 'Я пойду!' button.
   *
   * @param eventId Event id.
   */
  public onSubscribeBtnClick(eventId: number): void {
    this.userService.currentUser$
      .pipe(
        first(),
        switchMap((user) => {
          if (user) {
            if (user.role === Role.Host) {
              return this.dialogService.openInformationDialog(INCORRECT_ROLE);
            }
            return this.eventsService.subscribe(eventId);
          }
          return this.dialogService.openInformationDialog(UNAUTHORIZED_SUBSCRIBE);
        }),
      )
      .subscribe(() => this.isUserSubscribed = true);
  }

  /**
   * Handles click on 'Не пойду' button.
   *
   * @param eventId Event id.
   */
  public onUnsubscribeBtnClick(eventId: number): void {
    this.eventsService.unsubscribe(eventId)
      .pipe(first())
      .subscribe(() => this.isUserSubscribed = false);
  }

  private initMapOptionsStream(event$: Observable<Event>): Observable<MapOptions> {
    return event$
      .pipe(
        first(),
        map((event) => new MapOptions({
          position: event.place,
        })),
      );
  }

  private isEventCanceled(event$: Observable<Event>): void {
    event$.pipe(
      first(),
      filter(event => event.isCanceled),
      switchMap(_ => this.dialogService.openInformationDialog(EVENT_CANCELED_MESSAGE)),
    ).subscribe();
  }
}
