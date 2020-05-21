import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { AlertController } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { mapTo, switchMap, filter } from 'rxjs/operators';

import { CalendarOptions } from '../models/calendar';

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
    private readonly alertCtrl: AlertController,
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
        switchMap(() => this.showSuccessMessage()),
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
      this.calendar.requestWritePermission(
        () => subscriber.next(true),
        () => subscriber.next(false),
      );
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

  private async showSuccessMessage(): Promise<void> {
    const alert = await this.alertCtrl.create({
      message: 'Событие было добавлено',
      buttons: [
        { text: 'ОК' },
      ],
    });

    return alert.present() && alert.onDidDismiss().then();
  }
}
