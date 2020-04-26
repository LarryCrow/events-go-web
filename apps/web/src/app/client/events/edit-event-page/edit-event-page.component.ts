import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Event } from '@ego/common/core/models/event';
import { SaveEventModel } from '@ego/common/core/models/save-event';
import { EventsService } from '@ego/common/core/services/events.service';

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
   * Loading controller.
   */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

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
    this.isLoading$.next(true);
    this.eventService.update(eventToSave)
      .pipe(first())
      .subscribe(() => {
        this.isLoading$.next(false);
        this.snackBar.open('Событие сохранено успешно', 'Закрыть', { duration: 4000 });
      });
  }
}
