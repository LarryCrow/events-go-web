import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/** App component. */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /**
   * Whether menu should be displayed
   */
  public readonly isMenuDisplayed$: Observable<boolean>;

  private readonly pagesToHideMenu = ['/auth', '/auth/logout'];

  /**
   * @constructor
   *
   * @param router Router.
   */
  public constructor(
    private readonly router: Router,
  ) {
    this.isMenuDisplayed$ = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => this.pagesToHideMenu.every((link) => (link !== event.urlAfterRedirects))),
      );
  }
}
