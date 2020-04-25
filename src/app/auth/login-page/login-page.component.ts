import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { first, finalize } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';

/**
 * Login page.
 */
@Component({
  selector: 'ego-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  /**
   * Form group for login form.
   */
  public readonly form = this.initForm();
  /**
   * Error message.
   */
  public readonly apiError$ = new BehaviorSubject<string>(null);
  /**
   * Loading controller.
   */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

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
  ) { }

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
    this.authService.login(email, pass)
      .pipe(
        first(),
        finalize(() => this.isLoading$.next(false)),
      )
      .subscribe(
        () => {
          this.router.navigate(['/events']);
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

  private initForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required, Validators.minLength(5)]],
    });
  }
}
