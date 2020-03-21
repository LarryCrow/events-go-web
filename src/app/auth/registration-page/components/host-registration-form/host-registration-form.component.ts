import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { RegistrationData } from '../../../../core/models/registration-data';
import { AuthService } from '../../../../core/services/auth.service';

const AVATAR_ERROR = {
  amount: 'Пожалуйста, выберете ровно 1 файл',
  type: 'Неверный формат. Допустимые форматы: png, jpg, jpeg',
};

/**
 * Host form for registration.
 */
@Component({
  selector: 'ego-host-registration-form',
  templateUrl: './host-registration-form.component.html',
  styleUrls: ['./host-registration-form.component.scss'],
})
export class HostRegistrationFormComponent {
  /**
   * Host form.
   */
  public readonly form = this.initHostForm();
  /**
   * API error message.
   */
  public error = '';
  /**
   * Error with avatar selection.
   */
  public avatarError = '';
  /**
   * Keeps a name of a selected file.
   */
  public selectedFile = '';

  /**
   * @constructor
   *
   * @param fb - Form builder.
   * @param authService - Auth service.
   */
  public constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  /**
   * Handle host form submission.
   */
  public onFormSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const data: RegistrationData = {
      email: this.form.value.email as string,
      pass: this.form.value.pass as string,
      name: this.form.value.name as string,
      avatar: this.form.value.avatar as string,
    };
    this.authService.registerHost(data)
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

  /**
 * Handle file input.
 * @param event - Event.
 */
  public handleFileInput(event: Event): void {
    this.avatarError = '';
    const available_types = [
      'image/png',
      'image/jpeg',
    ];
    // Use casting because TS can't recognize the right type of event.target.
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length) {
      if (target.files.length > 1) {
        this.avatarError = AVATAR_ERROR.amount;
        return;
      }
      const file = target.files[0];
      if (!available_types.includes(file.type)) {
        this.avatarError = AVATAR_ERROR.type;
        return;
      }
      this.form.patchValue({
        avatar: file,
      });
      this.selectedFile = file.name;
    }
  }

  /**
   * Remove selected image.
   */
  public removeImage(): void {
    this.form.patchValue({
      avatar: '',
    });
    this.selectedFile = '';
  }

  private initHostForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      pass: [null, [Validators.required, Validators.minLength(5)]],
      name: [null, [Validators.required]],
      avatar: [null],
    });
  }
}
