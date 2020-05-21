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
  private readonly hostMapper = new HostMapper();
  private readonly clientMapper = new ClientMapper();
  /**
   * Cast DTO to Host model.
   * @param dto - Host DTO.
   */
  public fromDto(dto: AuthDto): User {
    return new User({
      role: dto.role === 1 ? Role.Host : Role.Client,
      details: dto.role === 1
        ? this.hostMapper.fromDto(dto.details as HostDto)
        : this.clientMapper.fromDto(dto.details as ClientDto),
    });
  }
}
