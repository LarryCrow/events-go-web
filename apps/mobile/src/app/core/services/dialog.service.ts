import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { ConfirmationDialogOptions, InfoDialogOptions } from '../models/dialog';

/**
 * Dialog service for mobile workspace.
 */
@Injectable({
  providedIn: 'root',
})
export abstract class DialogService {

  public constructor(
    private readonly alertCtrl: AlertController,
  ) { }

  /**
   * Open confirmation dialog.
   * @param opts Options.
   */
  public openConfirmDialog(opts: ConfirmationDialogOptions): Observable<boolean> {
    return new Observable((subscriber) => {
      this.alertCtrl.create({
        message: opts.message,
        header: opts.header,
        buttons: [
          {
            text: 'Отмена',
            role: 'cancel',
            handler: () => {
              subscriber.next(false);
              subscriber.complete();
            },
          },
          {
            text: 'ОК',
            handler: () => {
              subscriber.next(true);
              subscriber.complete();
            },
          },
        ],
      }).then(alert => alert.present() && alert.onDidDismiss());
    });
  }

  /**
   * Open information dialog.
   *
   * @param opts Options
   */
  public openInformDialog(opts: InfoDialogOptions): Observable<void> {
    return new Observable((subscriber) => {
      this.alertCtrl.create({
        message: opts.message,
        header: opts.header,
        buttons: [
          {
            text: 'ОК',
            handler: () => {
              subscriber.next();
              subscriber.complete();
            },
          },
        ],
      }).then(alert => alert.present() && alert.onDidDismiss());
    });
  }
}
