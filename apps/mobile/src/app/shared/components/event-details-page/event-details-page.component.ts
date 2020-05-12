import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '@ego/common/core/models/event';
import { MapOptions } from '@ego/common/core/models/map-options';
import { Role } from '@ego/common/core/models/role.enum';
import { AddressesService } from '@ego/common/core/services/addresses.service';
import { EventsService } from '@ego/common/core/services/events.service';
import { UserService } from '@ego/common/core/services/user.service';
import { DialogService } from '@ego/mobile/app/core/services/dialog.service';
import { PopoverController } from '@ionic/angular';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';
import { first, switchMap, filter, shareReplay, map, startWith, switchMapTo } from 'rxjs/operators';

import { EventDetailsPopoverComponent } from '../event-details-popover/event-details-popover.component';

const CANCELED_HEADER = 'Событие отменено';
const CANCELED_TEXT = 'К сожалению, мероприятие было отменено организатором. Подпишись, чтобы не пропустить новости.';

/**
 * Event details page.
 */
@Component({
  selector: 'egom-event-details-page',
  templateUrl: './event-details-page.component.html',
  styleUrls: ['./event-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsPageComponent {
  /** Is a user subscribed or not. */
  public readonly isUserSubscribed$: Observable<boolean>;
  /** Event. */
  public event$: Observable<Event>;
  /** Map options. */
  public readonly mapOptions$: Observable<MapOptions>;
  /** Is event canceled. */
  public readonly isCancenled$: Observable<boolean>;
  /** Name to display event address. */
  public readonly readbleName$: Observable<string>;
  /** Number of event subscribers. */
  public readonly subscribersNumber$: Observable<number>;

  private readonly updateSubscription$ = new ReplaySubject<void>(1);

  /**
   * @constructor
   *
   * @param eventsService Events service.
   * @param route Activated route.
   * @param dialogService Dialog service.
   * @param userService User service.
   * @param addressService Addresses service.
   * @param popoverCtrl Popover controller.
   */
  public constructor(
    private readonly eventsService: EventsService,
    private readonly route: ActivatedRoute,
    private readonly dialogService: DialogService,
    private readonly userService: UserService,
    private readonly addressService: AddressesService,
    private readonly popoverCtrl: PopoverController,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.event$ = this.initEventStream(id);
    this.readbleName$ = this.getReadableEventLocation();
    this.isUserSubscribed$ = this.initIsUserSubscribedStream();
    this.mapOptions$ = this.initMapOptionsStream(this.event$);
    this.isCancenled$ = this.isEventCanceled(this.event$);
  }

  /**
   * Handles click on 'Я пойду!' button.
   *
   * @param eventId Event id.
   */
  public onSubscribeBtnClick(eventId: number): void {
    this.eventsService.subscribe(eventId)
      .pipe(first())
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
   * Open popover
   */
  public async openPopover(): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: EventDetailsPopoverComponent,
      translucent: true,
    });
    popover.present();
  }

  /**
   * Handle 'click' on canceled button.
   */
  public onCanceledButton(): void {
    this.dialogService.openInformDialog({ header: CANCELED_HEADER, message: CANCELED_TEXT })
      .pipe(first())
      .subscribe();
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
