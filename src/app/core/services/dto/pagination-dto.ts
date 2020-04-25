/**
 * Pagination module.
 */
export interface PaginationDto<T> {
  /** Count. */
  count: number;
  /** Next. */
  next: string | null;
  /** Previous. */
  previous: string | null;
  /** Result list. */
  results: T[];
}
