import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfig } from '../services/app-config.service';
import { AuthService } from '../services/auth.service';

const NO_TOKEN_URLS = [
  'user/create/host',
  'user/create/client',
  'user/login',
];

/** Interceptor to provide auth information to request headers */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private appConfig: AppConfig,
  ) { }

  /** Inject auth token in requests */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken();

    const shouldSetToken = !this.isAuthRequest(req.url);

    if (authToken && shouldSetToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Token ${authToken}`),
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }

  /**
   * Checks if a request is for authorization or refresh token.
   * @param url - Request url.
   */
  private isAuthRequest(url: string): boolean {
    return NO_TOKEN_URLS
      .map(x => `${this.appConfig.baseUrl}${x}`)
      .some(x => x === url);
  }

}
