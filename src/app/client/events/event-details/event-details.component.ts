import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, ReplaySubject } from 'rxjs';
import { filter, first, switchMap, map, startWith, shareReplay, switchMapTo } from 'rxjs/operators';
import { AddressesService } from 'src/app/core/services/addresses.service';

import { Event } from '../../../core/models/event';
import { MapOptions } from '../../../core/models/map-options';
import { Role } from '../../../core/models/role.enum';
import { DialogService } from '../../../core/services/dialog.service';
import { EventsService } from '../../../core/services/events.service';
import { UserService } from '../../../core/services/user.service';

const UNAUTHORIZED_SUBSCRIBE = 'Для того, чтобы подписаться на событие, вам необходимо авторизоватьcя.';
const INCORRECT_ROLE = 'Организатор не может подписываться на события.';

/**
 * Page with event details.
 */
@Component({
  selector: 'ego-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsComponent {
  /**
   * Is a user subscribed or not.
   */
  public readonly isUserSubscribed$: Observable<boolean>;
  /**
   * Event.
   */
  public event$: Observable<Event>;
  /**
   * Map options.
   */
  public readonly mapOptions$: Observable<MapOptions>;
  /**
   * Is 'Я пойду' button should be displayed.
   */
  public readonly isSubscribeShown$: Observable<boolean>;
  /**
   * Is a user a host of an event.
   */
  public readonly isUserHost$: Observable<boolean>;
  /**
   * Is event canceled.
   */
  public readonly isCancenled$: Observable<boolean>;
  /**
   * Name to display event address.
   */
  public readonly readbleName$: Observable<string>;
  /**
   * Number of event subscribers.
   */
  public readonly subscribersNumber$: Observable<number>;

  private readonly updateSubscription$ = new ReplaySubject<void>(1);

  /**
   * @constructor
   *
   * @param eventsService Events service.
   * @param route Activated route.
   * @param dialogService Dialog service.
   * @param userService User service.
   * @param router Router.
   * @param addressService Addresses service.
   */
  public constructor(
    private readonly eventsService: EventsService,
    private readonly route: ActivatedRoute,
    private readonly dialogService: DialogService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly addressService: AddressesService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.event$ = this.initEventStream(id);
    this.readbleName$ = this.getReadableEventLocation();
    this.isUserSubscribed$ = this.initIsUserSubscribedStream();
    this.mapOptions$ = this.initMapOptionsStream(this.event$);
    this.isUserHost$ = this.initEventHostStream(this.event$);
    this.isCancenled$ = this.isEventCanceled(this.event$);
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
          if (!user) {
            return this.dialogService.openInformationDialog(UNAUTHORIZED_SUBSCRIBE);
          }
          if (user.role === Role.Host) {
            return this.dialogService.openInformationDialog(INCORRECT_ROLE);
          }
          return this.eventsService.subscribe(eventId);
        }),
        // If dialog is shown, null returns.
        filter(res => res),
      )
      .subscribe(() => this.updateSubscription$.next());
  }

  /**
   * Handles click on 'Не пойду' button.
   *
   * @param eventId Event id.
   */
  public onUnsubscribeBtnClick(eventId: number): void {
    this.eventsService.unsubscribe(eventId)
      .pipe(first())
      .subscribe(() => this.updateSubscription$.next());
  }

  /**
   * Handles click on 'Редактировать' button. Opens the edit page.
   */
  public onEditButtonClick(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  private initEventStream(eventId: string): Observable<Event> {
    return this.eventsService.getEvent(eventId)
      .pipe(
        shareReplay({
          refCount: true,
          bufferSize: 1,
        }),
      );
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

  private isEventCanceled(event$: Observable<Event>): Observable<boolean> {
    return event$.pipe(
      first(),
      map(event => event.isCanceled),
    );
  }

  private initEventHostStream(event$: Observable<Event>): Observable<boolean> {
    return combineLatest([
      event$,
      this.userService.currentUser$,
    ])
      .pipe(
        first(),
        filter(([_, user]) => user && user.role === Role.Host),
        map(([event, user]) => event.host.id === user.id),
        startWith(false),
      );
  }

  private getReadableEventLocation(): Observable<string> {
    return this.event$
      .pipe(
        first(),
        switchMap((event) => this.addressService.getAddressByCoordinates(event.place)),
        map((address) => address.value),
      );
  }

  private initIsUserSubscribedStream(): Observable<boolean> {
    const subscription$ = this.updateSubscription$
      .pipe(startWith(null));

    return this.userService.currentUser$
      .pipe(
        filter((user) => user && user.role === Role.Client),
        switchMapTo(combineLatest([this.event$, subscription$])),
        switchMap(([event, _]) => this.eventsService.isUserSubscribed(event.id)),
      );
  }
}
