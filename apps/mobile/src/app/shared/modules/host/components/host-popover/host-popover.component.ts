import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Host } from '@ego/common/core/models/host';
import { ModalController, PopoverController } from '@ionic/angular';

import { HostFeedbackComponent } from '../host-feedback/host-feedback.component';

/**
 * Popover for host page.
 */
@Component({
  selector: 'egom-host-popover',
  templateUrl: './host-popover.component.html',
  styleUrls: ['./host-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostPopoverComponent {
  /** Host. */
  @Input()
  public host: Host;

  public constructor(
    private readonly popover: PopoverController,
    private readonly modalCtrl: ModalController,
  ) { }

  /**
   * Open modal to send feedback.
   */
  public async sendFeedback(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: HostFeedbackComponent,
      componentProps: { id: this.host.id, name: this.host.name },
    });

    modal.present();
    this.close();
  }

  private close(): void {
    this.popover.dismiss();
  }
}
