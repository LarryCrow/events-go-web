/**
 * Pagination module.
 */
export interface PaginationDto<T> {
  /** count */
  count: number;
  /** next */
  next: string | null;
  /** previous */
  previous: string | null;
  /** Result list */
  results: T[];
}
