import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarService, CalendarOptions } from '@ego/mobile/app/core/services/calendar.service';
import { first } from 'rxjs/operators';

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
    private readonly calendarService: CalendarService,
  ) { }

  /**
   * Add event to calendar.
   */
  public addToCalendar(): void {
    const options: CalendarOptions = {
      title: 'title',
      endDate: new Date(),
      startDate: new Date(),
      location: 'location',
      notes: 'notes',
    };
    this.calendarService.createNote(options)
      .pipe(first())
      .subscribe();
  }
}
