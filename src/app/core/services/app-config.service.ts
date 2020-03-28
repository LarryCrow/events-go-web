import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

/**
 * App configuration.
 */
@Injectable({
  providedIn: 'root',
})
export class AppConfig {
  /** Base URL. */
  public readonly baseUrl = environment.baseUrl;
  /** Base URL for Dadata API. */
  public readonly baseDadatasUrl = environment.baseDadataUrl;
}
