/**
 * Filters for event searching.
 */
export class EventSearchFilters {
  /**
   * Event title.
   */
  public title?: string;
  /**
   * Host name.
   */
  public host?: string;
  /**
   * Host ID.
   */
  public host_id?: number;
  /**
   * Type ID.
   */
  public type_id?: number;
  /**
   * Start date.
   */
  public start?: string;
  /**
   * End date.
   */
  public end?: string;
  /**
   * Only upcoming events.
   */
  public upcoming: boolean;

  /**
   * @constructor
   *
   * @param data Initialize data.
   */
  public constructor(data: Partial<EventSearchFilters>) {
    this.title = data.title;
    this.host = data.host;
    this.host_id = data.host_id;
    this.type_id = data.type_id;
    this.start = data.start;
    this.end = data.end;
    this.upcoming = typeof data.upcoming === 'boolean' ? data.upcoming : true;
  }
}
