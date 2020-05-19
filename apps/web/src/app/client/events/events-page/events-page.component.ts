import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import {
  debounceTime,
  mapTo,
  startWith,
  distinctUntilChanged,
  map,
  scan,
  switchMapTo,
  mergeMap,
  shareReplay,
  withLatestFrom,
} from 'rxjs/operators';
import { Pagination } from '@ego/common/core/models/pagination';

import { Event } from '@ego/common/core/models/event';
import { EventSearchFilters } from '@ego/common/core/models/event-search-filters';
import { EventsService } from '@ego/common/core/services/events.service';

/**
 * Events list page.
 */
@Component({
  selector: 'ego-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPageComponent {
  /**
   * Events list.
   */
  public readonly pagination$: Observable<Pagination<Event>>;
  /**
   * Form control for search input.
   */
  public readonly inputControl = new FormControl('');
  /**
   * Loading controller.
   */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);
  /**
   * Control if filters are shown.
   */
  public areFiltersShown = false;
  /**
   * Search filters.
   */
  public readonly filters$ = new BehaviorSubject<EventSearchFilters>(new EventSearchFilters({}));
  /**
   * Emit when a user requests more events
   */
  public readonly moreEventsRequested$ = new Subject<void>();
  /**
   * Emit when a user type in search input.
   */
  private readonly searchValue$ = new BehaviorSubject<EventSearchFilters>(new EventSearchFilters({}));

  /**
   * @constructor
   *
   * @param eventsService Event service.
   */
  public constructor(
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
   * Open/close filters component.
   */
  public toggleFilters(): void {
    this.areFiltersShown = !this.areFiltersShown;
  }

  /**
   * Handle 'select' event of 'ego-search-filters'
   * @param selectedFilters Filters.
   */
  public onFiltersSelect(selectedFilters: EventSearchFilters): void {
    this.filters$.next(selectedFilters);
    this.areFiltersShown = false;
  }

  /**
   * Handle 'click' event of 'Ещё' button.
   */
  public onMoreButton(): void {
    this.moreEventsRequested$.next();
  }

  private initPaginationStream(): Observable<Pagination<Event>> {
    const inputChange$: Observable<string> = this.inputControl.valueChanges
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        startWith(''),
      );

    const filters$ = combineLatest([
      inputChange$,
      this.filters$,
    ]).pipe(
      map(([title, filters]) => {
        return new EventSearchFilters({
          ...filters,
          title: title || undefined,
        });
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    const pageAccumulation$ = this.moreEventsRequested$.pipe(
      mapTo(1), // Set number of requested pages on every emit
      startWith(1), // Set initial page
      scan(((curPage, requestedPages) => curPage + requestedPages)),
    );
    const pageChange$: Observable<number> = filters$.pipe(
      switchMapTo(pageAccumulation$),
    );

    return pageChange$.pipe(
      withLatestFrom(filters$),
      mergeMap(([page, f]) => {
        const newEvents$ = this.eventsService.getEvents(f, page);
        return page !== 1 ?
          newEvents$ :
          newEvents$.pipe(startWith(null)); // To clear the accumulator
      }),
      // Accumulate loaded topics
      scan((prevEvents, newEvents) => {
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
