import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DestroyableBase } from '@ego/common/shared/components/destroyable-base/destroyable-base.component';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { first, finalize, filter, takeUntil } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';

/** Registration page. */
@Component({
  selector: 'egom-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent extends DestroyableBase {
  /** Form group for login form. */
  public readonly form: FormGroup;
  /** Error message. */
  public readonly apiError$ = new BehaviorSubject<string>('');
  /** Loading controller. */
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
    private readonly navCtrl: NavController,
  ) {
    super();
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
    const email = form.value.email;
    const pass = form.value.pass;
    this.isLoading$.next(true);
    this.authService.registerClient({ email, pass })
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

  /**
   * Redirect back to login page.
   */
  public goLoginBack(): void {
    this.navCtrl.back();
  }

  private initForm(): FormGroup {
    const form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required, Validators.minLength(5)]],
    });

    // Remove error when any control changes.
    form.valueChanges.pipe(
      filter(() => this.apiError$.value.length !== 0),
      takeUntil(this.destroy$),
    ).subscribe(() => this.apiError$.next(''));

    return form;
  }
}
