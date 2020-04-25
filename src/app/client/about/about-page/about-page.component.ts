import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DialogService } from 'src/app/core/services/dialog.service';

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
  ) { }

  /**
   * Handle 'submit' event of feedback form.
   */
  public onFormSubmitted(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.dialogService.openInformationDialog(
      'Ваше сообщение было отправлено. Мы обязательно прочтём его!', 'Спасибо',
    ).pipe(first()).subscribe();
  }

  private createFeedbackForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      message: [null, [Validators.required]],
    });
  }
}
