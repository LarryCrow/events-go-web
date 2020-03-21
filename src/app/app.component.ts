import { Component } from '@angular/core';

import { AuthService } from './core/services/auth.service';

/**
 * Main application component.
 */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  /**
   * @constructor
   *
   * @param authService Auth service.
   */
  public constructor(
    private readonly authService: AuthService,
  ) {
    this.authService.getCurrentUser();
  }
}
