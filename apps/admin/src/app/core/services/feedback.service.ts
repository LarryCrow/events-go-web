import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@ego/common/core/services/app-config.service';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

import { Feedback } from '../models/feedback';

import { FeedbackDto } from './dto/feedback.dto';
import { FeedbackMapper } from './mapper/feedback.mapper';

/** Feedback service. */
@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private readonly feedbackUrl = `${this.appConfig.baseUrl}staff/feedback/`;

  /**
   * @constructor
   *
   * @param http Http client
   * @param appConfig App config.
   */
  public constructor(
    private readonly http: HttpClient,
    private readonly appConfig: AppConfig,
    private readonly feedbackMapper: FeedbackMapper,
  ) { }

  /**
   * Get feedback list.
   */
  public getFeedbackList(): Observable<Feedback[]> {
    return this.http.get<FeedbackDto[]>(this.feedbackUrl)
      .pipe(
        map((feedbackDtoList) => feedbackDtoList
          .map((feedback) => this.feedbackMapper.from(feedback)),
        ),
      );
  }

  /**
   * Get feedback by id.
   *
   * @param id Feedback id.
   */
  public getFeedbackById(id: number): Observable<Feedback> {
    const url = new URL(id.toString(), this.feedbackUrl);
    return this.http.get<FeedbackDto>(url.toString())
      .pipe(map(this.feedbackMapper.from));
  }

  /**
   * Answer on feedback.
   *
   * @param message Message.
   */
  public handleFeedback(id: number, message: string): Observable<void> {
    const url = new URL(`${id}/`, this.feedbackUrl);
    const body = { message };
    return this.http.patch(url.toString(), body)
      .pipe(mapTo(null));
  }
}
