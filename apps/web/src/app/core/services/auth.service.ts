import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserMapper } from '@ego/common/core/mappers/user.mapper';
import { HostRegistrationData } from '@ego/common/core/models/registration-data';
import { AppConfig } from '@ego/common/core/services/app-config.service';
import { BaseAuthService } from '@ego/common/core/services/auth.service';
import { AuthDto } from '@ego/common/core/services/dto/login-dto';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError, mapTo } from 'rxjs/operators';

/**
 * Authorization service.
 */
@Injectable({
  providedIn: 'root',
})
export abstract class AuthService extends BaseAuthService {

  private readonly REGISTER_HOST_URL = `${this.appConfig.baseUrl}users/hosts/`;

  public constructor(
    protected readonly http: HttpClient,
    protected readonly appConfig: AppConfig,
    protected readonly userMapper: UserMapper,
  ) {
    super(http, appConfig, userMapper);
  }

  /**
   * Login a user.
   * @param email Email
   * @param password Password.
   */
  public login(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
    };
    return this.http.post<AuthDto>(this.LOGIN_URL, body)
      .pipe(
        tap((data) => {
          this.saveToken(data);
          this.userChange$.next(this.createUser(data));
        }),
        map((data) => data.role),
        catchError((err) => throwError(this.mapApiLoginError(err))),
      );
  }

  /**
   * Register a host.
   *
   * @param data Data for registration.
   */
  public registerHost(data: HostRegistrationData): Observable<void> {
    const formData = this.generateFormDataForHostRegistration(data);
    return this.http.post<AuthDto>(this.REGISTER_HOST_URL, formData)
      .pipe(
        mapTo(null),
        catchError((err) => throwError(this.mapApiRegistrationError(err))),
      );
  }

  private generateFormDataForHostRegistration(data: HostRegistrationData): FormData {
    const fd = new FormData();
    fd.append('email', data.email);
    fd.append('password', data.pass);
    fd.append('name', data.name);
    fd.append('avatar', data.avatar);
    fd.append('about', data.about);
    fd.append('phone', data.phone);
    fd.append('work_email', data.workEmail);
    fd.append('instagram', data.instagram);
    fd.append('twitter', data.twitter);
    fd.append('vk', data.vk);
    fd.append('telegram', data.telegram);
    return fd;
  }
}
