import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { AppConfig } from './app-config.service';

/** Feedback service */
@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private readonly hostFeedbackUrl = `${this.appConfig.baseUrl}hosts/`;
  private readonly feedbackUrl = `${this.appConfig.baseUrl}feedback/`;

  public constructor(
    private readonly http: HttpClient,
    private readonly appConfig: AppConfig,
  ) {

  }

  /**
   * Send feedback about the platform
   */
  public sendPlatformFeedback(email: string, message: string): Observable<void> {
    const body = { email, message };
    return this.http.post(this.feedbackUrl, body)
      .pipe(mapTo(null));
  }

  /**
   * Send feedback about a host.
   *
   * @param id Host id.
   */
  public sendHostFeedback(id: number, message: string): Observable<void> {
    const body = {
      message: message,
    };
    const url = new URL(`${id}/feedback/`, this.hostFeedbackUrl);
    return this.http.post(url.toString(), body)
      .pipe(mapTo(null));
  }

  /**
   * Get host feedback.
   *
   * @param id Host id.
   */
  public getHostFeedback(id: number): Observable<any> {
    const url = new URL(`${id}/feedback/`, this.hostFeedbackUrl);
    return this.http.get(url.toString())
      .pipe(mapTo(null));
  }
}
