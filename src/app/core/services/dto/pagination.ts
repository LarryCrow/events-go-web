/**
 * Pagination module.
 */
export interface Pagination<T> {
  /** count */
  count: number;
  /** next */
  next: string | null;
  /** previous */
  previous: string | null;
  /** Result list */
  results: T[];
}
