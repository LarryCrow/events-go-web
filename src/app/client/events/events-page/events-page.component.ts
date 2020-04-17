import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

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
    this.isLoading$.next(true);
    this.events$ = this.searchValue$
      .pipe(
        switchMap((filters) => this.eventsService.getEvents(filters)),
        tap(() => this.isLoading$.next(false)),
      );
  }

  /**
   * Handle search button click.
   */
  public searchValue(): void {
    const filters = new EventSearchFilters({
      title: this.inputControl.value,
      host: this.inputControl.value,
    });
    this.searchValue$.next(filters);
  }
}
