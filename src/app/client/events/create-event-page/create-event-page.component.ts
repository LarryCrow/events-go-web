import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Create event page.
 */
@Component({
  selector: 'ego-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.scss']
})
export class CreateEventPageComponent {

  public constructor(
    private readonly router: Router,
  ) { }

  /**
   * Handle 'save' event of 'ego-event-form'.
   *
   * @param event Event object.
   */
  public onFormSave(event: Event): void {
    this.router.navigate(['/events']);
  }
}
