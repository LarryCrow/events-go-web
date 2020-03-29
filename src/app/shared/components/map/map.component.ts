import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MapOptions } from 'src/app/core/models/map-options';

/**
 * Map component.
 */
@Component({
  selector: 'ego-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  /** Component options */
  @Input()
  public options: MapOptions;

  public constructor() { }
}
