/** Pagination model. */
export interface Pagination<T> {
  /** Number of elements. */
  itemsCount: number;

  /** Number of pages. */
  pagesCount?: number;

  /** Result. */
  items: T[];
}
