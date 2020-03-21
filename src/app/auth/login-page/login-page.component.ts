import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';

/**
 * Login page.
 */
@Component({
  selector: 'ego-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  /**
   * Form group for login form.
   */
  public readonly form = this.initForm();

  /**
   * Error message.
   */
  public error = '';

  /**
   * Run the animation.
   */
  public loginFinished = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  /**
   * Handle form submit. Login.
   */
  public onFormSubmit(form: FormGroup): void {
    this.form.markAllAsTouched();
    if (form.invalid) {
      return;
    }
    this.error = '';
    // Fields are required and we are able to cast value to string.
    const email = form.value.email as string;
    const pass = form.value.pass as string;
    this.authService.login(email, pass)
      .pipe(
        first(),
      )
      .subscribe(
        () => {
          this.router.navigate(['/events']);
        },
        (err) => {
          if (err instanceof Error) {
            this.error = err.message;
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
