import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventSearchFilters } from '@ego/common/core/models/event-search-filters';
import { EventType } from '@ego/common/core/models/event-type';
import { EventsService } from '@ego/common/core/services/events.service';
import { parseDateToFilterString } from '@ego/common/shared/utils/date';
import { Observable, ReplaySubject, NEVER, merge, of } from 'rxjs';
import { tap, switchMapTo } from 'rxjs/operators';

/**
 * Filters for events searching.
 */
@Component({
  selector: 'ego-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersComponent implements OnInit {
  /**
   * Selected filters.
   */
  @Input()
  public selectedFilters: EventSearchFilters;
  /**
   * Emit value.
   */
  @Output()
  public readonly select = new EventEmitter<EventSearchFilters>();
  /**
   * Form group
   */
  public readonly form$: Observable<FormGroup>;
  /**
   * Event types
   */
  public readonly eventTypes$: Observable<EventType[]>;
  /**
   * Min date for datepicker.
   */
  public readonly minDate = new Date();

  private init$ = new ReplaySubject<void>(1);

  /**
   * @constructor
   *
   * @param eventsService Events service.
   * @param fb Form builder.
   */
  public constructor(
    eventsService: EventsService,
    private readonly fb: FormBuilder,
  ) {
    this.form$ = this.initFormStream();
    this.eventTypes$ = eventsService.getEventTypes();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.init$.next();
  }

  /**
   * Handle 'submit' event of form.
   *
   * @param form Filters form.
   */
  public onFormSubmitted(form: FormGroup): void {
    const filters = new EventSearchFilters({
      host: form.value.hostName || undefined,
      type_id: form.value.type || undefined,
      start: form.value.start ? parseDateToFilterString(form.value.start) : undefined,
      end: form.value.end ? parseDateToFilterString(form.value.end) : undefined,
    });
    filters.upcoming = form.value.start ? false : true;
    this.select.emit(filters);
  }

  /**
   * Clear form fields.
   *
   * @param form Filters form.
   */
  public clearFilters(form: FormGroup): void {
    form.reset();
  }

  private initFormStream(): Observable<FormGroup> {
    const form = this.fb.group({
      hostName: [''],
      type: [''],
      start: [''],
      end: [''],
    });

    const formFill$ = this.init$
      .pipe(
        tap(() => {
          form.patchValue({
            hostName: this.selectedFilters.host,
            type: this.selectedFilters.type_id,
            start: this.selectedFilters.start ? new Date(this.selectedFilters.start) : '',
            end: this.selectedFilters.end ? new Date(this.selectedFilters.end) : '',
          });
        }),
        switchMapTo(NEVER),
      );

    return merge(of(form), formFill$);
  }
}
