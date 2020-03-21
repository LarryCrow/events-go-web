import { Injectable } from '@angular/core';

import { Host } from '../models/host';
import { HostDto } from '../services/dto/host-dto';

/**
 * Mapper for casting host models.
 */
@Injectable({
  providedIn: 'root',
})
export class HostMapper {
  /**
   * Cast DTO to Host model.
   * @param dto - Host DTO.
   */
  public fromDto(dto: HostDto): Host {
    return new Host({
      id: dto.user,
      avatar: dto.avatar,
      isActivated: dto.is_activated,
      name: dto.name,
    });
  }
}
