/**
 * Address model.
 */
export class Address {
  /** Readable value */
  public value: string;
  /** Value to make request */
  public unstrictedValue: string;
  /** Determine if address belongs to building. */
  public isBuilding: boolean;
  /** Coordinates. */
  public coords?: Coords;

  public constructor(data: Partial<Address>) {
    this.value = data.value;
    this.unstrictedValue = data.unstrictedValue;
    this.isBuilding = data.isBuilding;
    this.coords = data.coords;
  }
}

/**
 * Place coordinate model.
 */
export class Coords {
  /** Latitude */
  public lat: number;
  /** Longitude */
  public lon: number;

  public constructor(data: Partial<Coords>) {
    this.lat = data.lat;
    this.lon = data.lon;
  }

  /**
   * Represent coords in string.
   */
  public getStringCoords(): string {
    return `${this.lat}, ${this.lon}`;
  }
}
