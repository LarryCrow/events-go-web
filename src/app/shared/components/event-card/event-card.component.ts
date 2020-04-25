import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/core/models/event';

/**
 * Event card component.
 */
@Component({
  selector: 'ego-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent {
  /**
   * Event.
   */
  @Input()
  public event: Event;

  /**
   * @constructor
   *
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
