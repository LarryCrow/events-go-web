import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Event } from 'src/app/core/models/event';

/**
 * Events list component.
 */
@Component({
  selector: 'ego-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListComponent {
  /**
   * Events list.
   */
  @Input()
  public events: Event[];

  public constructor() { }

  /**
   * TrackBy function for events list.
   *
   * @param _ Idx.
   * @param event Event.
   */
  public trackEvent(_: number, event: Event): number {
    return event.id;
  }
}
