import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MapOptions } from '@ego/common/core/models/map-options';

/**
 * Map component.
 */
@Component({
  selector: 'egoc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  /** Component options */
  @Input()
  public options: MapOptions;
}
