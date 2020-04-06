import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  public inputControl = new FormControl('');

  private searchValue$ = new BehaviorSubject<EventSearchFilters>(new EventSearchFilters({}));

  /**
   * @constructor
   *
   * @param eventsService Event service.
   */
  public constructor(
    private readonly eventsService: EventsService,
  ) {
    this.events$ = this.searchValue$
      .pipe(
        switchMap((filters) => this.eventsService.getEvents(filters)),
      );
  }

  /**
   * Handle search button click.
   */
  public searchValue(): void {
    const filters = {
      title: this.inputControl.value,
    } as EventSearchFilters;
    this.searchValue$.next(filters);
  }
}