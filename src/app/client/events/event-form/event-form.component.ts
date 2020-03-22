import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of, BehaviorSubject, from } from 'rxjs';
import { Event } from 'src/app/core/models/event';
import { switchMap, first } from 'rxjs/operators';
import { SaveEventModel } from 'src/app/core/models/save-event';
import { EventsService } from 'src/app/core/services/events.service';

/**
 * Form to create or edit event.
 */
@Component({
  selector: 'ego-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  /**
   * Event object.
   */
  @Input()
  public event?: Event;
  /**
   * Form.
   */
  public readonly form$: Observable<FormGroup>;

  private readonly init$ = new BehaviorSubject<void>(null);

  public constructor(
    private readonly fb: FormBuilder,
    private readonly eventService: EventsService,
  ) {
    this.form$ = this.init$
      .pipe(
        first(),
        switchMap(() => this.initFormStream()),
      );
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.init$.next();
  }

  /**
   * Handles form submit event.
   *
   * @param form Form.
   */
  public onFormSubmit(form: FormGroup): void {
    form.markAllAsTouched();
    if (form.invalid) {
      return;
    }
    const body = {
      title: form.value.title,
      date: form.value.date,
      description: form.value.description,
      price: form.value.description,
    } as SaveEventModel;

    this.eventService.create(body)
      .pipe(
        first(),
      )
      .subscribe();
  }

  private initFormStream(): Observable<FormGroup> {
    let form: FormGroup;
    if (!this.event) {
      form = this.fb.group({
        'title': [null, [Validators.required, Validators.maxLength(50)]],
        'price': [null, [Validators.required, Validators.min(0)]],
        'date': [null, [Validators.required]],
        'description': [null, [Validators.required]],
        'avatar': [null],
      });
    } else {
      form = this.fb.group({
        'title': [this.event.title, [Validators.required, Validators.maxLength(50)]],
        'price': [this.event.price, [Validators.required, Validators.min(0)]],
        'date': [this.event.date, [Validators.required]],
        'description': [this.event.description, [Validators.required]],
        'avatar': [null],
      });
    }
    return of(form);
  }
}
