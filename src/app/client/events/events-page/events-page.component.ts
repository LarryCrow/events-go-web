import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, tap, debounceTime, mapTo, startWith, distinctUntilChanged } from 'rxjs/operators';

import { Event } from '../../../core/models/event';
import { EventSearchFilters } from '../../../core/models/event-search-filters';
import { EventsService } from '../../../core/services/events.service';

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
  public readonly events$: Observable<Event[]>;
  /**
   * Form control for search input.
   */
  public readonly inputControl = new FormControl('');
  /**
   * Loading controller.
   */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);
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
    this.events$ = this.initEventsStream();
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

  private initEventsStream(): Observable<Event[]> {
    const filters = new EventSearchFilters({});

    const inputChange$: Observable<string> = this.inputControl.valueChanges
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
      );

    const filters$ = inputChange$
      .pipe(
        tap((title) => filters.title = title),
        mapTo(filters),
        startWith(filters),
      );

    return filters$
      .pipe(
        switchMap((f) => this.eventsService.getEvents(f)),
      );
  }
}
