import { Component, ChangeDetectionStrategy } from '@angular/core';

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

  public constructor() { }
}
