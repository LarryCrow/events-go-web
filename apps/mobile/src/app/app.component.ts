import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { tap, first } from 'rxjs/operators';

import { AuthService } from './core/services/auth.service';

/** App component. */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  /**
   * @constructor
   *
   * @param platform Platform.
   * @param splashScreen Splash screen.
   * @param statusBar Status bar.
   * @param authService Auth service.
   */
  public constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.initializeApp();
  }

  /**
   * Initialize ionic app.
   */
  public initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.getCurrentUser()
        .pipe(
          first(),
          tap((res) => {
            if (res) {
              this.router.navigate(['/tabs/events']);
            } else {
              this.router.navigate(['/auth']);
            }
          }),
        ).subscribe();
    });
  }
}
