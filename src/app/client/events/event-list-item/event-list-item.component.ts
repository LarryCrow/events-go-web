import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../../../core/models/event';

/**
 * List item of events list.
 */
@Component({
  selector: 'ego-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss'],
})
export class EventListItemComponent {
  /**
   * Event.
   */
  @Input()
  public event: Event;

  /**
   * @constructor
   * @param router - Router.
   */
  public constructor(
    private readonly router: Router,
  ) { }

  /**
   * Opens page with event details.
   */
  public openEventDetails(): void {
    this.router.navigate([this.event.id.toString()]);
  }
}
