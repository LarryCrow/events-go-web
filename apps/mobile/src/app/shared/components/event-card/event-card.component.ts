import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Event } from '@ego/common/core/models/event';

/**
 * Event card.
 */
@Component({
  selector: 'egom-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent {
  /** Event */
  @Input()
  public event: Event;

  public constructor() { }
}
