import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Event } from '@ego/common/core/models/event';
import { EventSearchFilters } from '@ego/common/core/models/event-search-filters';
import { Pagination } from '@ego/common/core/models/pagination';
import { EventsService } from '@ego/common/core/services/events.service';
import { ModalController } from '@ionic/angular';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { startWith, shareReplay, mapTo, scan, switchMapTo, withLatestFrom, mergeMap, first } from 'rxjs/operators';

import { EventFiltersModal } from '../components/event-filters-modal/event-filters-modal.component';

/** Events page component */
@Component({
  selector: 'egom-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPageComponent {
  /** Events list. */
  public readonly pagination$: Observable<Pagination<Event>>;
  /** Form control for search input. */
  public readonly inputControl = new FormControl('');
  /** Loading controller. */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);
  /** Search filters. */
  public readonly filters$ = new BehaviorSubject<EventSearchFilters>(new EventSearchFilters({}));
  /** Emit when a user requests more events */
  public readonly moreEventsRequested$ = new Subject<void>();
  /** Emit when a user type in search input. */
  private readonly searchValue$ = new BehaviorSubject<EventSearchFilters>(new EventSearchFilters({}));

  /**
   * @constructor
   *
   * @param modalCtrl Modal controller.
   * @param eventsService Event service.
   */
  public constructor(
    private readonly modalCtrl: ModalController,
    private readonly eventsService: EventsService,
  ) {
    this.pagination$ = this.initPaginationStream();
  }

  /**
   * Handle search button click.
   */
  public searchValue(): void {
    const filters = new EventSearchFilters({
      title: this.inputControl.value,
    });
    this.searchValue$.next(filters);
  }

  /**
   * Handle 'select' event of 'ego-search-filters'.
   *
   * @param selectedFilters Filters.
   */
  public onFiltersSelect(selectedFilters: EventSearchFilters): void {
    this.filters$.next(selectedFilters);
  }

  /**
   * Handle 'click' event of 'Ещё' button.
   */
  public loadMoreEvents(event: CustomEvent): void {
    this.moreEventsRequested$.next();
    this.pagination$.pipe(first())
      // @ts-ignore the absence of `complete` on CustomEventTarget
      .subscribe(() => event.target.complete());
  }

  /**
   * Handle 'click' of filters button.
   */
  public async onFiltersButton(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EventFiltersModal,
      componentProps: {
        selectedFilters: this.filters$.value,
      },
    });

    await modal.present();
    const res = await modal.onDidDismiss();
    if (res.data) {
      this.filters$.next(res.data);
    }
  }

  private initPaginationStream(): Observable<Pagination<Event>> {
    const pageAccumulation$ = this.moreEventsRequested$.pipe(
      mapTo(1), // Set number of requested pages on every emit
      startWith(1), // Set initial page
      scan(((curPage, requestedPages) => curPage + requestedPages)),
    );
    const pageChange$: Observable<number> = this.filters$.pipe(
      switchMapTo(pageAccumulation$),
    );

    return pageChange$.pipe(
      withLatestFrom(this.filters$),
      mergeMap(([page, f]) => {
        const newEvents$ = this.eventsService.getEvents(f, page);
        return page !== 1 ?
          newEvents$ :
          newEvents$.pipe(startWith(null)); // To clear the accumulator
      }),
      // Accumulate loaded events
      scan((prevEvents: Pagination<Event>, newEvents: Pagination<Event>) => {
        if (prevEvents && newEvents) {
          return {
            items: prevEvents.items.concat(newEvents.items),
            itemsCount: newEvents.itemsCount,
          } as Pagination<Event>;
        }
        return newEvents;
      }, null),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }
}
