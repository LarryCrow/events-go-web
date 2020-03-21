import { HostDto } from './host-dto';

/**
 * DTO for Event model.
 */
export interface EventDto {
  /** Id. */
  id: number;
  /** Title. */
  title: string;
  /** Description. */
  description: string;
  /** Place. */
  place: string;
  /** Date. */
  date: string;
  /** Price. */
  price: number;
  /** Host. */
  host: HostDto;
  /** Participations. */
  participations: number[];
  /** Is canceled. */
  is_canceled: boolean;
  /** Is complete. */
  is_complete: boolean;
}
