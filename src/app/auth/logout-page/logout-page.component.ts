import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

/**
 * Logout page.
 */
@Component({
  selector: 'ego-logout',
  template: '',
})
export class LogoutPageComponent {

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
    this.router.navigate(['/auth/login']);
  }
}
