import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '@ego/common/core/models/role.enum';
import { AppConfig } from '@ego/common/core/services/app-config.service';
import { BaseAuthService } from '@ego/common/core/services/auth.service';
import { LoginDto } from '@ego/common/core/services/dto/login-dto';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

/**
 * Authorization service.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseAuthService {

  public constructor(
    protected readonly http: HttpClient,
    protected readonly appConfig: AppConfig,
  ) {
    super(http, appConfig);
  }

  /**
   * Login method.
   *
   * @param email Email.
   * @param password Password.
   */
  public login(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
    };
    return this.http.post<LoginDto>(this.LOGIN_URL, body)
      .pipe(
        tap((data) => {
          if (data.role !== Role.Client) {
            throw {
              error: {
                error: 'User has wrong role for this action',
              },
            };
          }
          this.saveToken(data);
          this.userChange$.next(this.createUser(data));
        }),
        map((data) => data.role),
        catchError((err) => throwError(this.mapApiLoginError(err))),
      );
  }
}
