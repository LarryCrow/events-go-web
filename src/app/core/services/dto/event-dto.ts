import { EventTypeDto } from './event-type-dto';
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
  /** Start date. */
  start: string;
  /** End date. */
  end: string;
  /** Price. */
  price: number;
  /** Host. */
  host: HostDto;
  /** Participants number. */
  participants_number: number;
  /** Is canceled. */
  is_canceled: boolean;
  /** Is complete. */
  is_complete: boolean;
  /** Avatar. */
  avatar: string;
  /** Type */
  type: EventTypeDto;
}
