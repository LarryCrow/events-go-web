import { Injectable } from '@angular/core';

import { Feedback } from '../../models/feedback';
import { FeedbackDto } from '../dto/feedback.dto';

/**
 * Feedback mapper.
 */
@Injectable({ 'providedIn': 'root' })
export class FeedbackMapper {
  /**
   * Map DTO to Feedback object.
   * @param dto Feedback dto.
   */
  public from(dto: FeedbackDto): Feedback {
    return new Feedback({
      email: dto.email,
      id: dto.id,
      message: dto.message,
    });
  }
}
