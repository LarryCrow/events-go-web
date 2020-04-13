import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Host } from 'src/app/core/models/host';

import { HostRegistrationData } from '../../../core/models/registration-data';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Host form for creation/edit.
 */
@Component({
  selector: 'ego-host-edit-form',
  templateUrl: './host-edit-form.component.html',
  styleUrls: ['./host-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostEditFormComponent {
  /** Host data. */
  @Input()
  public host: Host;
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
    const data = this.gatherDataFromForm(this.form);
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

  private initHostForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      pass: [null, [Validators.required, Validators.minLength(5)]],
      name: [null, Validators.required],
      avatar: [null, Validators.required],
      about: [null, Validators.required],
      phone: '',
      workEmail: '',
      instagram: '',
      twitter: '',
      telegram: '',
      vk: '',
    });
  }

  private gatherDataFromForm(form: FormGroup): HostRegistrationData {
    const data: HostRegistrationData = {
      email: form.value.email as string,
      pass: form.value.pass as string,
      name: form.value.name as string,
      avatar: form.value.avatar as File,
      about: form.value.about,
      phone: form.value.phone,
      instagram: form.value.instagram,
      telegram: form.value.telegram,
      twitter: form.value.twitter,
      vk: form.value.vk,
      workEmail: form.value.workEmail,
    };
    return data;
  }
}
