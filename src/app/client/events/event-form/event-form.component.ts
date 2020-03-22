import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { Event } from 'src/app/core/models/event';
import { SaveEventModel } from 'src/app/core/models/save-event';
import { EventsService } from 'src/app/core/services/events.service';

/**
 * Form to create or edit event.
 */
@Component({
  selector: 'ego-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
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
  /**
   * Emit an event if it is saved successfully.
   */
  @Output()
  public save = new EventEmitter<Event>();

  private readonly init$ = new BehaviorSubject<void>(null);

  public constructor(
    private readonly fb: FormBuilder,
    private readonly eventService: EventsService,
    private readonly snackBar: MatSnackBar,
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
      price: form.value.price,
    } as SaveEventModel;

    this.eventService.create(body)
      .pipe(
        first(),
      )
      .subscribe((event) => {
        this.snackBar.open('Событие сохранено успешно', 'Закрыть', { duration: 3000 });
        if (this.save) {
          this.save.emit(event);
        }
      });
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
