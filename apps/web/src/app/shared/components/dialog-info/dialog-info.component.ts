import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog info component.
 */
@Component({
  selector: 'ego-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogInfoComponent {

  /**
   * @constructor
   *
   * @param dialogRef Material dialog ref.
   * @param data Input data.
   */
  public constructor(
    public dialogRef: MatDialogRef<DialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
}
