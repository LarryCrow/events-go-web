import { Component } from '@angular/core';
import { MenuLink } from '@ego/common/core/models/menu-link';
import { Role } from '@ego/common/core/models/role.enum';
import { UserService } from '@ego/common/core/services/user.service';
import { AuthService } from '@ego/web/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

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
   * Menu Links
   */
  public readonly extraMenuLinks$: Observable<MenuLink[]>;

  private readonly allEvents: MenuLink = { title: 'Все события', url: '/events' };
  private readonly myEvents: MenuLink = { title: 'Мои события', url: '/events/my' };
  private readonly createEvent: MenuLink = { title: 'Создать событие', url: '/events/create' };
  private readonly login: MenuLink = { title: 'Войти', url: '/auth/login' };
  private readonly about: MenuLink = { title: 'О нас', url: '/about' };
  private readonly logout: MenuLink = { title: 'Выйти', url: '/auth/logout' };

  /**
   * @constructor
   *
   * @param authService Auth service.
   * @param userService User service.
   */
  public constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    this.authService.getCurrentUser().pipe(first()).subscribe();
    this.menuLinks$ = this.initMenuLinks();
    this.extraMenuLinks$ = this.initExtraMenuLinksStream();
  }

  private initMenuLinks(): Observable<MenuLink[]> {
    return this.userService.currentUser$
      .pipe(
        map(user => {
          if (!user) {
            return [this.allEvents, this.login];
          }
          if (user.role === Role.Host) {
            return [this.allEvents, this.myEvents, this.createEvent];
          }
          return [this.allEvents, this.myEvents];
        }),
      );
  }

  private initExtraMenuLinksStream(): Observable<MenuLink[]> {
    return this.userService.currentUser$
      .pipe(
        map(user => {
          if (!user) {
            return [this.about];
          }
          return [this.about, this.logout];
        }),
      );
  }
}
