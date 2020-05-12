import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '@ego/mobile/app/core/services/dialog.service';
import { first, filter } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

/**
 * Menu item model.
 */
interface MenuItem {
  /** Path for navigation. */
  path: string;
  /** Readable name. */
  title: string;
}

const LOGOUT_HEADER = 'Выход';
const LOGOUT_MESSAGE = 'Вы уверены, что хотите выйти?';

/**
 * Menu page.
 */
@Component({
  selector: 'egom-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent {
  /**
   * Menu list.
   */
  public menu: MenuItem[];

  /**
   * @constructor
   */
  public constructor(
    private readonly dialogService: DialogService,
    private readonly navCtrl: NavController,
  ) {
    this.menu = [
      {
        path: 'about',
        title: 'О нас',
      },
    ];
  }

  /**
   * Handle 'click' on logout menu item.
   */
  public onLogoutClick(): void {
    this.dialogService.openConfirmDialog({ header: LOGOUT_HEADER, message: LOGOUT_MESSAGE })
      .pipe(
        first(),
        filter((res) => res),
      ).subscribe(() => this.navCtrl.navigateRoot(['/auth/logout']));
  }
}
