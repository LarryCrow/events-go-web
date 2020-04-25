import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogInfoComponent } from 'src/app/shared/components/dialog-info/dialog-info.component';

/**
 * Dialog service.
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {

  /**
   * @constructor
   *
   * @param dialog Mat dialog.
   */
  public constructor(
    private readonly dialog: MatDialog,
  ) { }

  /**
   * Opens dialog modal window to inform a user.
   *
   * @param message - Message.
   */
  public openInformationDialog(message: string, header?: string): Observable<any> {
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      maxWidth: '500px',
      data: {
        message,
        header,
      },
      disableClose: true,
    });

    return dialogRef.afterClosed();
  }
}
