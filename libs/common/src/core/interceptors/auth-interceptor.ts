import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseAuthService } from '../services/auth.service';

const NO_TOKEN_URLS = [
  'user/create/host',
  'user/create/client',
  'user/login',
];

const DADATA_BASE_URL = 'suggestions.dadata.ru';

/** Interceptor to provide auth information to request headers */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: BaseAuthService,
  ) { }

  /** Inject auth token in requests */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken();

    const shouldSetToken = !this.isAuthRequest(req.url);

    if (this.isDadataRequest(req.url)) {
      const dadataReq = req.clone({
        headers: req.headers.set('Authorization', 'Token fab8a2193c0ffc01a0bb41075b96f3e74cceddca'),
      });

      return next.handle(dadataReq);
    } else if (authToken && shouldSetToken) {
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
      .some(x => url.includes(x));
  }

  private isDadataRequest(url: string): boolean {
    return url.includes(DADATA_BASE_URL);
  }

}
