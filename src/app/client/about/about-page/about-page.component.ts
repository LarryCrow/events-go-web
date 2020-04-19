import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  public constructor(
    private readonly fb: FormBuilder,
  ) { }

  /**
   * Handle 'submit' event of feedback form.
   */
  public onFormSubmitted(): void {
    return;
  }

  private createFeedbackForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      message: [null, [Validators.required]],
    });
  }
}
