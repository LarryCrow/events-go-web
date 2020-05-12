import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventSearchFilters } from '@ego/common/core/models/event-search-filters';
import { EventType } from '@ego/common/core/models/event-type';
import { EventTypesService } from '@ego/common/core/services/event-types.service';
import { ModalController } from '@ionic/angular';
import { Observable, NEVER, merge, of, ReplaySubject } from 'rxjs';
import { tap, switchMapTo, first } from 'rxjs/operators';

/**
 * Event filters modal
 */
@Component({
  selector: 'egom-event-filters-modal',
  templateUrl: './event-filters-modal.component.html',
  styleUrls: ['./event-filters-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFiltersModal implements OnInit {
  /** Selected filters */
  @Input()
  public selectedFilters: EventSearchFilters;
  /** Form group */
  public readonly form$: Observable<FormGroup>;
  /** Event types */
  public readonly eventTypes$: Observable<EventType[]>;

  private readonly init$ = new ReplaySubject<void>(1);

  /**
   * @constructor
   *
   * @param fb Form builder.
   * @param eventTypesService Event types service.
   */
  public constructor(
    private readonly fb: FormBuilder,
    private readonly eventTypesService: EventTypesService,
    private readonly modalCtrl: ModalController,
  ) {
    this.form$ = this.initFormStream();
    this.eventTypes$ = this.eventTypesService.getEventTypes();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.init$.next();
  }

  /**
   * Submit form.
   */
  public submitForm(): void {
    this.form$.pipe(first())
      .subscribe((form) => {
        const filters = new EventSearchFilters({
          title: form.value.title || undefined,
          host: form.value.hostName || undefined,
          type_id: form.value.type ? parseInt(form.value.type, 10) : undefined,
          start: form.value.start || undefined,
          end: form.value.end || undefined,
        });
        filters.upcoming = form.value.start ? false : true;
        this.close(filters);
      });
  }

  /**
   * Handle 'click' event of clear button.
   *
   * @param form Form to clear.
   */
  public onClearClick(form: FormGroup): void {
    form.reset();
  }

  /**
   * Handle 'click' event of close button.
   */
  public onCloseClick(): void {
    this.close();
  }

  private initFormStream(): Observable<FormGroup> {
    const form = this.fb.group({
      title: [''],
      hostName: [''],
      type: [''],
      start: [''],
      end: [''],
    });

    const formFill$: Observable<FormGroup> = this.init$
      .pipe(
        tap(() => {
          form.patchValue({
            title: this.selectedFilters.title,
            hostName: this.selectedFilters.host,
            type: this.selectedFilters.type_id,
            start: this.selectedFilters.start,
            end: this.selectedFilters.end,
          });
        }),
        switchMapTo(NEVER),
      );

    return merge(of(form), formFill$);
  }

  private close(data?: EventSearchFilters): void {
    this.modalCtrl.dismiss(data);
  }
}
