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
  public upcoming?: boolean = true;

  public constructor(date: Partial<EventSearchFilters>) {
    this.title = date.title;
    this.host = date.host;
    this.host_id = date.host_id;
    this.upcoming = date.upcoming;
  }
}
