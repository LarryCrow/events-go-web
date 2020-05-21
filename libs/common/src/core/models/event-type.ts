/**
 * Model for event type.
 */
export class EventType {
  /** Id */
  public id: number;
  /** Value */
  public value: string;

  public constructor(data: Partial<EventType>) {
    this.id = data.id;
    this.value = data.value;
  }
}
