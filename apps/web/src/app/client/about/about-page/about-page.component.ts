import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '@ego/common/core/services/dialog.service';
import { first, switchMap } from 'rxjs/operators';
import { FeedbackService } from '@ego/common/core/services/feedback.service';

/**
 * About us page.
 */
@Component({
  selector: 'ego-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  /**
   * Feedback form.
   */
  public readonly form = this.createFeedbackForm();

  /**
   * @constructor
   *
   * @param fb Form builder
   * @param dialogService Dialog service.
   */
  public constructor(
    private readonly fb: FormBuilder,
    private readonly dialogService: DialogService,
    private readonly feedbackService: FeedbackService,
  ) { }

  /**
   * Handle 'submit' event of feedback form.
   */
  public onFormSubmitted(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.feedbackService.sendPlatformFeedback(this.form.value.email, this.form.value.message)
      .pipe(
        switchMap(() => this.dialogService.openInformationDialog(
          'Ваше сообщение было отправлено. Мы обязательно прочтём его!', 'Спасибо',
        )),
        first(),
      ).subscribe();
  }

  private createFeedbackForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      message: [null, [Validators.required]],
    });
  }
}
