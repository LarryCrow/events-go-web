import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';

/**
 * Event details popover component.
 */
@Component({
  selector: 'egom-event-details-popover',
  templateUrl: './event-details-popover.component.html',
  styleUrls: ['./event-details-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsPopoverComponent {

  /**
   * @constructor
   *
   * @param calendar Calendar plugin service.
   */
  public constructor(
    private readonly calendar: Calendar,
  ) { }

  /**
   * Add event to calendar.
   */
  public addToCalendar(): void {
    this.calendar.createCalendar('MyCalendar').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); },
    );
  }
}
