import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Event } from '@ego/common/core/models/event';
import { CalendarOptions } from '@ego/mobile/app/core/models/calendar';
import { CalendarService } from '@ego/mobile/app/core/services/calendar.service';
import { PopoverController } from '@ionic/angular';
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
  /** Event. */
  @Input()
  public event: Event;

  /**
   * @constructor
   *
   * @param popoverCtrl Popover controller.
   * @param calendar Calendar plugin service.
   */
  public constructor(
    private readonly popoverCtrl: PopoverController,
    private readonly calendarService: CalendarService,
  ) { }

  /**
   * Add event to calendar.
   */
  public addToCalendar(): void {
    const options: CalendarOptions = {
      title: this.event.title,
      endDate: this.event.end,
      startDate: this.event.start,
      location: 'location',
      notes: 'notes',
    };
    this.calendarService.createNote(options)
      .pipe(first())
      .subscribe(() => this.close());
  }

  private close(): void {
    this.popoverCtrl.dismiss();
  }
}
