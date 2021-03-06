import { Injectable } from '@angular/core';

import { Event } from '../models/event';
import { EventDto } from '../services/dto/event-dto';

import { EventTypeMapper } from './event-type-mapper';
import { HostMapper } from './host.mapper';

/**
 * Mapper for casting event models.
 */
@Injectable({
  providedIn: 'root',
})
export class EventMapper {
  private readonly hostMapper = new HostMapper();
  private readonly eventTypeMapper = new EventTypeMapper();
  /**
   * Cast DTO to Event model.
   * @param dto - Event DTO.
   */
  public fromDto(dto: EventDto): Event {
    return new Event({
      id: dto.id,
      description: dto.description,
      host: this.hostMapper.fromDto(dto.host),
      start: new Date(dto.start),
      end: new Date(dto.end),
      isCanceled: dto.is_canceled,
      isComplete: dto.is_complete,
      participantsNumber: dto.participants_number,
      place: this.getCoordinates(dto.place),
      price: dto.price,
      title: dto.title,
      avatar: dto.avatar,
      type: this.eventTypeMapper.fromDto(dto.type),
    });
  }

  private getCoordinates(coords: string): [number, number] {
    const casted = coords
      .split(',')
      .map(val => parseFloat(val));
    if (casted.length !== 2) {
      return null;
    }
    return [casted[0], casted[1]];
  }
}
