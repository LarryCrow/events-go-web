/**
 * Model to create or edit an event.
 */
export interface SaveEventModel {
  /** Id */
  id?: number;
  /** Title */
  title: string;
  /** Price */
  price: number;
  /** Description */
  description: string;
  /** Date */
  date: string;
  /** Place */
  place: string;
  /** File */
  avatar: File;
  /** Event type id. */
  type_id: number;
}
