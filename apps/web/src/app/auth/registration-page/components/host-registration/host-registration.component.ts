import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { HostRegistrationData } from '@ego/common/core/models/registration-data';
import { DialogService } from '@ego/common/core/services/dialog.service';
import { AuthService } from '@ego/web/app/core/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/internal/operators/first';
import { finalize, switchMap } from 'rxjs/operators';

const NOTIFICATION_MESSAGE = `Ваш аккаунт зарегистрирован, но нам нужно время, чтобы проверить его.
                              Это может занять несколько дней.
                              После подтверждения на указанную почту придёт уведомление.`;

/**
 * Component for host registration.
 */
@Component({
  selector: 'ego-host-registration',
  templateUrl: './host-registration.component.html',
  styleUrls: ['./host-registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostRegistrationComponent {
  /**
   * Loader controller.
   */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

  /**
   * @constructor
   *
   * @param router Router
   * @param authService Auth service.
   * @param dialogService Dialog service.
   */
  public constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly dialogService: DialogService,
  ) { }

  /**
   * Handle 'submit' event of host form and register a user.
   *
   * @param data
   */
  public onFormSubmitted(data: HostRegistrationData): void {
    this.isLoading$.next(true);
    this.authService.registerHost(data)
      .pipe(
        first(),
        switchMap(() => this.showNotificationDialog()),
        finalize(() => this.isLoading$.next(false)),
      ).subscribe(
        () => this.router.navigate(['/events']),
        (err) => {
          if (err instanceof Error) {
            console.log(err);
          }
        },
      );
  }

  private showNotificationDialog(): Observable<void> {
    return this.dialogService.openInformationDialog(NOTIFICATION_MESSAGE, 'Аккаунт зарегистрирован');
  }
}
