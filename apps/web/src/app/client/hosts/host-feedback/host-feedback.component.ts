import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@ego/common/core/services/dialog.service';
import { FeedbackService } from '@ego/common/core/services/feedback.service';
import { HostsService } from '@ego/common/core/services/hosts.service';
import { Observable } from 'rxjs';
import { first, switchMap, map, mapTo, switchMapTo } from 'rxjs/operators';

const SUCCESS_MESSAGE = 'Ваше сообщение было отправлено! Скоро вы cможете увидеть свой отзыв на странице организатора.';

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
    private readonly dialogService: DialogService,
    private readonly router: Router,
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
      switchMapTo(this.showSuccessAlert()),
      first(),
    ).subscribe(() => this.router.navigate(['/']));
  }

  private showSuccessAlert(): Observable<void> {
    return this.dialogService.openInformationDialog(SUCCESS_MESSAGE, 'Ура')
      .pipe(mapTo(null));
  }

  private initForm(): FormGroup {
    return this.fb.group({
      feedback: ['', [Validators.required]],
    });
  }
}
