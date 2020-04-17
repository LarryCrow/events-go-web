import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { SaveEventModel } from 'src/app/core/models/save-event';
import { EventsService } from 'src/app/core/services/events.service';
import { BehaviorSubject } from 'rxjs';

/**
 * Create event page.
 */
@Component({
  selector: 'ego-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEventPageComponent {
  /**
   * Loading controller.
   */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

  /**
   * @constructor
   *
   * @param eventService Event service.
   * @param router Router.
   * @param snackBar Material SnackBar.
   */
  public constructor(
    private readonly eventService: EventsService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) { }

  /**
   * Handle 'save' event of 'ego-event-form'.
   *
   * @param eventToSave Event object.
   */
  public onFormSave(eventToSave: SaveEventModel): void {
    this.isLoading$.next(true);
    this.eventService.create(eventToSave)
      .pipe(first())
      .subscribe(() => {
        this.isLoading$.next(false);
        this.snackBar.open('Событие сохранено успешно', 'Закрыть', { duration: 4000 });
        this.router.navigate(['/events']);
      });
  }
}
