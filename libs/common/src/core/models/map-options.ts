/**
 * Option for Map component.
 */
export class MapOptions {
  /** Position of point. */
  public position: [number, number];
  /** Zoom. */
  public zoom: number;
  /** Map center. */
  public center: [number, number];

  public constructor(data: Partial<MapOptions>) {
    this.position = data.position;
    this.zoom = data.zoom || 16;
    this.center = data.center || this.position;
  }
}
