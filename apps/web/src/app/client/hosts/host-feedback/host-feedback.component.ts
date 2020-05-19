import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from '@ego/common/core/services/feedback.service';
import { first, switchMap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Host } from '@ego/common/core/models/host';
import { HostsService } from '@ego/common/core/services/hosts.service';

/**
 * Host feedback page.
 */
@Component({
  selector: 'ego-host-feedback',
  templateUrl: './host-feedback.component.html',
  styleUrls: ['./host-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostFeedbackComponent {
  /** Feedback form. */
  public readonly form: FormGroup;
  /** Host name. */
  public readonly hostName$: Observable<string>;

  private readonly hostId$: Observable<number>;

  public constructor(
    private readonly fb: FormBuilder,
    private readonly feedbackService: FeedbackService,
    private readonly route: ActivatedRoute,
    private readonly hostService: HostsService,
  ) {
    this.hostId$ = this.route.paramMap.pipe(
      map((params) => parseInt(params.get('id'), 10)),
    );
    this.hostName$ = this.hostId$.pipe(
      switchMap((id) => this.hostService.getHost(id)),
      map((host) => host.name),
    );
    this.form = this.initForm();
  }

  /**
   * Handle 'submit' of feedback form.
   */
  public onFormSubmitted(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const message = this.form.value.feedback;
    this.hostId$.pipe(
      switchMap((id) => this.feedbackService.sendHostFeedback(id, message)),
      first(),
    ).subscribe();
  }

  private initForm(): FormGroup {
    return this.fb.group({
      feedback: ['', [Validators.required]],
    });
  }
}
