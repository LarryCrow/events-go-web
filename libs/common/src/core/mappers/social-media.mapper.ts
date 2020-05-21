import { Injectable } from '@angular/core';

import { SocialMedia } from '../models/social-media';
import { SocialMediaDto } from '../services/dto/social-media-dto';

/**
 * Mapper for casting social media models.
 */
@Injectable({
  providedIn: 'root',
})
export class SocialMediaMapper {
  /**
   * Cast DTO to SocialMedia model.
   * @param dto - Social media DTO.
   */
  public fromDto(dto: SocialMediaDto): SocialMedia {
    return new SocialMedia({
      instagram: dto.instagram,
      telegram: dto.telegram,
      twitter: dto.twitter,
      vk: dto.vk,
    });
  }
}
