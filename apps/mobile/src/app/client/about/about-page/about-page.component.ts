import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '@ego/mobile/app/core/services/dialog.service';
import { first } from 'rxjs/operators';

const SUCCESSFUL_SENT_HEADER = 'Мы получили ваше письмо!';
const SUCCESSFUL_SENT_TEXT = 'Ваше сообщение было отправлено. Мы обязательно прочтём его!';

/**
 * About us page.
 */
@Component({
  selector: 'egom-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  /** Feedback form. */
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
  ) { }

  /**
   * Handle 'submit' event of feedback form.
   */
  public onFormSubmitted(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.dialogService
      .openInformDialog({ header: SUCCESSFUL_SENT_HEADER, message: SUCCESSFUL_SENT_TEXT })
      .pipe(first()).subscribe();
  }

  private createFeedbackForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      message: [null, [Validators.required]],
    });
  }
}
