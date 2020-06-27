import { Injectable } from '@angular/core';

import { Role } from '../models/role.enum';
import { User } from '../models/user';
import { ClientDto } from '../services/dto/client.dto';
import { HostDto } from '../services/dto/host-dto';
import { AuthDto } from '../services/dto/login-dto';

import { ClientMapper } from './client.mapper';
import { HostMapper } from './host.mapper';

/**
 * Mapper for casting host models.
 */
@Injectable({
  providedIn: 'root',
})
export class UserMapper {
  /**
   * Cast DTO to Host model.
   * @param dto - Host DTO.
   */
  public fromDto(dto: AuthDto): User {
    return new User({
      role: dto.role,
      email: dto.email,
      id: dto.id,
      name: dto.name,
    });
  }
}
