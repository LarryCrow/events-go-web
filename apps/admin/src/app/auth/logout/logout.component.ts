import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

/** Logout page. */
@Component({
  selector: 'egoa-logout',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent {
  /**
   * @constructor
   *
   * @param router Router.
   * @param authService Auth service.
   */
  public constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
