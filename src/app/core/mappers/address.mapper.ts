import { Injectable } from '@angular/core';

import { Address, Coords } from '../models/address';
import { SuggestedPlaceDto } from '../services/dto/suggestion-place-dto';

/**
 * Mapper for casting address models.
 */
@Injectable({
  providedIn: 'root',
})
export class AddressMapper {
  /**
   * Cast DTO to address model.
   * @param dto - address DTO.
   */
  public fromDto(dto: SuggestedPlaceDto): Address {
    return new Address({
      value: dto.value,
      unstrictedValue: dto.unrestricted_value,
      isBuilding: dto.data.house_type ? true : false,
      coords: dto.data.geo_lat && dto.data.geo_lon && new Coords({
        lat: parseInt(dto.data.geo_lat, 10) || null,
        lon: parseInt(dto.data.geo_lon, 10) || null,
      }) || null,
    });
  }
}
