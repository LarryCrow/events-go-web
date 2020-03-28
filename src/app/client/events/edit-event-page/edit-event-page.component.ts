import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Event } from 'src/app/core/models/event';
import { SaveEventModel } from 'src/app/core/models/save-event';
import { EventsService } from 'src/app/core/services/events.service';

/**
 * Page to edit an event.
 */
@Component({
  selector: 'ego-edit-event-page',
  templateUrl: './edit-event-page.component.html',
  styleUrls: ['./edit-event-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEventPageComponent {
  /**
   * Event.
   */
  public readonly event$: Observable<Event>;

  /**
 * @constructor
 *
 * @param eventService Event service.
 * @param snackBar Material SnackBar.
 * @param route Activated route.
 */
  public constructor(
    private readonly eventService: EventsService,
    private readonly snackBar: MatSnackBar,
    private readonly route: ActivatedRoute,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.event$ = this.eventService.getEvent(id)
      .pipe(first());
  }

  /**
   * Handle 'save' event of 'ego-event-form'.
   *
   * @param eventToSave Event object.
   */
  public onFormSave(eventToSave: SaveEventModel): void {
    this.eventService.create(eventToSave)
      .pipe(first())
      .subscribe(() => {
        this.snackBar.open('Событие сохранено успешно', 'Закрыть', { duration: 3000 });
      });
  }
}
