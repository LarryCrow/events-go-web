import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Host } from 'src/app/core/models/host';

/**
 * Host page.
 */
@Component({
  selector: 'ego-host-page',
  templateUrl: './host-page.component.html',
  styleUrls: ['./host-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostPageComponent {
  /**
   * Host.
   */
  public readonly host$: Observable<Host>;

  public constructor() { }
}
