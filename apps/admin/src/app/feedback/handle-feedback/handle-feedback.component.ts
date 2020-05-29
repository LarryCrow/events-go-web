import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';

import { Feedback } from '../../core/models/feedback';
import { FeedbackService } from '../../core/services/feedback.service';

/**
 * Handle feedback page.
 */
@Component({
  selector: 'egoa-handle-feedback',
  templateUrl: './handle-feedback.component.html',
  styleUrls: ['./handle-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HandleFeedbackComponent {
  /** Feedback form. */
  public readonly form: FormGroup;
  /** Feedback. */
  public readonly feedback$: Observable<Feedback>;

  public constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly feedbackService: FeedbackService,
  ) {
    this.form = this.initFormGroup();
    this.feedback$ = this.route.paramMap.pipe(
      map((params) => parseInt(params.get('id'), 10)),
      switchMap((id) => this.feedbackService.getFeedbackById(id)),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /**
   * Handle 'submit' of feedback form.
   */
  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const message = this.form.value.message;
    this.feedback$.pipe(
      switchMap(({ id }) => this.feedbackService.handleFeedback(id, message)),
    ).subscribe(() => this.router.navigate(['/feedback']));
  }

  private initFormGroup(): FormGroup {
    return this.fb.group({
      message: ['', [Validators.required]],
    });
  }
}
