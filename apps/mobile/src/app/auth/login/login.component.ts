import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@ego/common/core/services/auth.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { first, finalize, filter, takeUntil } from 'rxjs/operators';

/** Login page. */
@Component({
  selector: 'egom-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  /**
   * Form group for login form.
   */
  public readonly form: FormGroup;
  /**
   * Error message.
   */
  public readonly apiError$ = new BehaviorSubject<string>('');
  /**
   * Loading controller.
   */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

  private readonly destroy$ = new Subject<void>();

  /**
   * @constructor
   *
   * @param fb Form builder.
   * @param authService Auth service.
   * @param router Router.
   */
  public constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.form = this.initForm();
  }

  /**
   * Handle form submit. Login.
   */
  public onFormSubmit(form: FormGroup): void {
    this.form.markAllAsTouched();
    if (form.invalid || this.isLoading$.value) {
      return;
    }
    this.apiError$.next('');
    // Fields are required and we are able to cast value to string.
    const email = form.value.email;
    const pass = form.value.pass;
    this.isLoading$.next(true);
    this.authService.clientLogin(email, pass)
      .pipe(
        first(),
        finalize(() => this.isLoading$.next(false)),
      )
      .subscribe(
        () => {
          this.router.navigate(['/tabs/events']);
        },
        (err) => {
          if (err instanceof Error) {
            this.apiError$.next(err.message);
          } else {
            console.log(err);
          }
        },
      );
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): FormGroup {
    const form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required, Validators.minLength(5)]],
    });
    form.valueChanges.pipe(
      filter(() => this.apiError$.value.length !== 0),
      takeUntil(this.destroy$),
    ).subscribe(() => this.apiError$.next(''));
    return form;
  }
}
