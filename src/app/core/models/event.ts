import { EventType } from './event-type';
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
  /** Start time of an event. */
  public start: Date;
  /** End time of an event. */
  public end: Date;
  /** Price. */
  public price: number;
  /** Host. */
  public host: Host;
  /** Is canceled. */
  public isCanceled: boolean;
  /** Is complete. */
  public isComplete: boolean;
  /** Avatar */
  public avatar: string;
  /** Type */
  public type: EventType;
  /** Number of subscribed users. */
  public participantsNumber: number;

  public constructor(data: Partial<Event>) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.place = data.place;
    this.start = data.start;
    this.end = data.end;
    this.price = data.price;
    this.host = data.host;
    this.isCanceled = data.isCanceled;
    this.isComplete = data.isComplete;
    this.avatar = data.avatar;
    this.type = data.type;
    this.participantsNumber = data.participantsNumber;
  }
}
