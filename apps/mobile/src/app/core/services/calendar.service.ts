import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Observable, from } from 'rxjs';
import { mapTo, switchMap, switchMapTo, filter } from 'rxjs/operators';

export interface CalendarOptions {
  /** Title */
  title: string;
  /** Start date */
  startDate: Date;
  /** Endd ate */
  endDate: Date;
  /** Location */
  location?: string;
  /** Notes */
  notes?: string;
}

/** Wrap service to work with Calendar plugin */
@Injectable({
  providedIn: 'root',
})
export class CalendarService {

  /**
   * @constructor
   *
   * @param calendar Calendar plugin.
   */
  public constructor(
    private readonly calendar: Calendar,
  ) { }

  /** Create calendar note. */
  public createNote(options: CalendarOptions): Observable<void> {
    return this.checkPemissions()
      .pipe(
        switchMap((val) => {
          if (!val) {
            return this.askForPermission()
              .pipe(
                filter((isPermissionsGranted) => isPermissionsGranted),
                switchMap(() => this.createEvent(options)),
              );
          }
          return this.createEvent(options);
        }),
        mapTo(null),
      );
  }

  private checkPemissions(): Observable<boolean> {
    return new Observable((subscriber) => {
      this.calendar.hasWritePermission()
        .then((value) => subscriber.next(value));
    });
  }

  private askForPermission(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.calendar.requestWritePermission()
        .then((val) => subscriber.next(true))
        .catch((err) => subscriber.next(false));
    });
  }

  private createEvent(options: CalendarOptions): Observable<void> {
    return from(this.calendar.createEvent(
      options.title,
      options.location || '',
      options.notes || '',
      options.startDate,
      options.endDate,
    )).pipe(mapTo(null));
  }
}
