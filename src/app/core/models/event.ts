import { Host } from './host';

/**
 * Event model.
 */
export class Event {
  /** Id. */
  public id: number;
  /** Title. */
  public title: string;
  /** Description. */
  public description: string;
  /** Place. */
  public place: [number, number];
  /** Date. */
  public date: Date;
  /** Price. */
  public price: number;
  /** Host. */
  public host: Host;
  /** ID list of participations. */
  public participations: number[];
  /** Is canceled. */
  public isCanceled: boolean;
  /** Is complete. */
  public isComplete: boolean;

  public constructor(data: Partial<Event>) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.place = data.place;
    this.date = data.date;
    this.price = data.price;
    this.host = data.host;
    this.participations = data.participations;
    this.isCanceled = data.isCanceled;
    this.isComplete = data.isComplete;
  }
}
