import { Component, Input } from '@angular/core';
import { MapOptions } from 'src/app/core/models/map-options';

/**
 * Map component.
 */
@Component({
  selector: 'ego-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  /** Component options */
  @Input()
  public options: MapOptions;

  public constructor() { }
}
