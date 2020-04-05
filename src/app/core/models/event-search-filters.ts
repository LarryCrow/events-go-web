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
   * Only upcoming events.
   */
  public upcoming = true;

  /**
   * @constructor
   *
   * @param data Initialize data.
   */
  public constructor(data: Partial<EventSearchFilters>) {
    this.title = data.title;
    this.host = data.host;
    this.host_id = data.host_id;
    this.upcoming = typeof data.upcoming === 'boolean' ? data.upcoming : true;
  }
}
