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
  public constructor(
    private readonly dialog: MatDialog,
  ) { }

  /**
   * Opens dialog modal window to inform a user.
   * @param message - Message.
   */
  public openInformationDialog(message: string): Observable<any> {
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      width: '250px',
      data: { message: message },
    });

    return dialogRef.afterClosed();
  }
}
