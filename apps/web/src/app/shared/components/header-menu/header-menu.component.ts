import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MenuLink } from '@ego/common/core/models/menu-link';

/**
 * Header menu component
 */
@Component({
  selector: 'ego-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMenuComponent {
  /**
   * Link list.
   */
  @Input()
  public links: MenuLink[];
}
