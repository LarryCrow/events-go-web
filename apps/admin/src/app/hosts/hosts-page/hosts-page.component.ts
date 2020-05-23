import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Host } from '@ego/common/core/models/host';
import { Observable } from 'rxjs';

/** Hosts page. */
@Component({
  selector: 'egoa-hosts-page',
  templateUrl: './hosts-page.component.html',
  styleUrls: ['./hosts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostsPageComponent {
  /** Hosts */
  public readonly hosts$: Observable<Host>;

  public constructor() { }

  /**
   * Handle 'click' of confirm.
   *
   * @param id Host id.
   */
  public onConfirmClick(id: number): void {

  }
}
