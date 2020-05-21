import { Component } from '@angular/core';
import { AuthService } from '@ego/web/app/core/services/auth.service';
import { NavController } from '@ionic/angular';

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
    private readonly navCtrl: NavController,
    private readonly authService: AuthService,
  ) {
    this.authService.logout();
    this.navCtrl.navigateRoot(['/auth']);
  }
}
