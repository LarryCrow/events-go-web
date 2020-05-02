import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { ClientRegistrationData } from '@ego/common/core/models/registration-data';
import { AuthService } from '@ego/web/app/core/services/auth.service';

/**
 * Host form component for registration.
 */
@Component({
  selector: 'ego-client-registration-form',
  templateUrl: './client-registration-form.component.html',
  styleUrls: ['./client-registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientRegistrationFormComponent {
  /**
   * Client form.
   */
  public readonly form = this.initClientForm();
  /**
   * API error message.
   */
  public error = '';

  /**
   * @constructor
   *
   * @param router Router
   * @param fb Form builder.
   * @param authService Auth service.
   */
  public constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
  ) { }

  /**
   * Handle client form sumbission.
   */
  public onFormSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const data: ClientRegistrationData = {
      email: this.form.value.email as string,
      pass: this.form.value.pass as string,
    };
    this.authService.registerClient(data)
      .pipe(first())
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

  private initClientForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      pass: [null, [Validators.required]],
    });
  }

}
