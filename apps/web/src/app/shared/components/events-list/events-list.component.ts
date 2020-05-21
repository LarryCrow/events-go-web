import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Event } from '@ego/common/core/models/event';

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
