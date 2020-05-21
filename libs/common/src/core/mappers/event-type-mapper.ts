import { Injectable } from '@angular/core';

import { EventType } from '../models/event-type';
import { EventTypeDto } from '../services/dto/event-type-dto';

/**
 * Mapper for casting event type models.
 */
@Injectable({
  providedIn: 'root',
})
export class EventTypeMapper {
  /**
   * Cast DTO to event type model.
   * @param dto - event type DTO.
   */
  public fromDto(dto: EventTypeDto): EventType {
    return new EventType({
      id: dto.id,
      value: dto.value,
    });
  }
}
