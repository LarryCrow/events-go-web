import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Role } from './core/models/role.enum';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';

/**
 * Model for menu link.
 */
interface MenuLink {
  /**
   * Title.
   */
  title: string;
  /**
   * URL.
   */
  value?: string;
  /**
   * Handling function.
   */
  func?: Function;
}

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
   * List of links.
   */
  public readonly menuLinks$: Observable<MenuLink[]>;
  /**
   * Control if menu should be displayed or not
   */
  public readonly isMenuDisplayed$: Observable<boolean>;

  private pagesToHideMenu = [
    '/auth/login',
    '/auth/register',
  ];

  private readonly allEvents: MenuLink = { title: 'Все события', value: '/events' };
  private readonly myEvents: MenuLink = { title: 'Мои события', value: '/events/my' };
  private readonly createEvent: MenuLink = { title: 'Создать событие', value: '/events/create' };
  private readonly login: MenuLink = { title: 'Войти', value: '/auth/login' };
  private readonly logout: MenuLink = { title: 'Выйти', func: () => this.onLogoutClick() };

  /**
   * @constructor
   *
   * @param authService Auth service.
   */
  public constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {
    this.authService.getCurrentUser();
    this.menuLinks$ = this.initMenuLinks();
    this.isMenuDisplayed$ = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => this.pagesToHideMenu.every((link) => (link !== event.urlAfterRedirects))),
      );
  }

  private initMenuLinks(): Observable<MenuLink[]> {
    return this.userService.currentUser$
      .pipe(
        map(user => {
          if (!user) {
            return [this.allEvents, this.login];
          }
          if (user.role === Role.Host) {
            return [this.allEvents, this.myEvents, this.createEvent, this.logout];
          }
          return [this.allEvents, this.myEvents, this.logout];
        }),
      );
  }

  private onLogoutClick(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
