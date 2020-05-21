import { Injectable } from '@angular/core';

import { Client } from '../models/client';
import { ClientDto } from '../services/dto/client.dto';

/**
 * Mapper for casting host models.
 */
@Injectable({
  providedIn: 'root',
})
export class ClientMapper {
  /**
   * Cast DTO to Host model.
   * @param dto - Host DTO.
   */
  public fromDto(dto: ClientDto): Client {
    return new Client({
      name: dto.name,
      email: dto.email,
    });
  }
}
