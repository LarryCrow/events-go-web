/**
 * Filters for event searching.
 */
export class EventSearchFilters {
  /**
   * Event title.
   */
  public title: string;

  /**
   * @constructor
   * @param data - Initial data.
   */
  public constructor(data: Partial<EventSearchFilters>) {
    this.title = data.title;
  }
}
