import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from '@ego/common/core/services/feedback.service';
import { ModalController, AlertController } from '@ionic/angular';
import { first } from 'rxjs/operators';

const SUCCESS_MESSAGE = 'Ваше сообщение было отправлено! Скоро вы cможете увидеть свой отзыв на странице организатора.';

/** Modal window to send feedback about a host. */
@Component({
  selector: 'egom-host-feedback',
  templateUrl: './host-feedback.component.html',
  styleUrls: ['./host-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostFeedbackComponent {
  /** Host id. */
  @Input()
  public id: number;
  /** Host name. */
  @Input()
  public name: string;
  /** Feedback form. */
  public readonly form: FormGroup;

  public constructor(
    private readonly modalCtrl: ModalController,
    private readonly fb: FormBuilder,
    private readonly alertCtrl: AlertController,
    private readonly feedbackService: FeedbackService,
  ) {
    this.form = this.initForm();
  }

  /**
   * Handle 'submit' of feedback form.
   */
  public onFormSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const message = this.form.value.feedback;
    this.feedbackService.sendHostFeedback(this.id, message)
      .pipe(first())
      .subscribe(() => this.showSuccessAlert());
  }

  /**
   * Handle 'click' of close button.
   */
  public onCloseClick(): void {
    this.close();
  }

  private async showSuccessAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      message: SUCCESS_MESSAGE,
      buttons: [
        { text: 'OK', handler: () => this.close() },
      ],
    });
    alert.present();
  }

  /**
   * Init feedback form group.
   */
  private initForm(): FormGroup {
    return this.fb.group({
      feedback: ['', [Validators.required]],
    });
  }

  private close(): void {
    this.modalCtrl.dismiss();
  }
}
