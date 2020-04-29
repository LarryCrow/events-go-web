import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, map, mapTo, first } from 'rxjs/operators';

import { HostRegistrationData, ClientRegistrationData } from '../models/registration-data';
import { Role } from '../models/role.enum';
import { User } from '../models/user';

import { AppConfig } from './app-config.service';
import { LoginDto } from './dto/login-dto';

/**
 * List of keys to apply local storage.
 */
enum StorageKeys {
  /** Auth token. */
  token = 'egoat',
  /** Refresh token. */
  refresh = 'egort',
}

const API_ERRORS = {
  credentials: 'Invalid credentials',
  email: 'This field must be unique.',
  unconfirmed: 'Host is still not confirmed',
  wrongRole: 'User has wrong role for this action',
};

/**
 * Authorization service.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${this.appConfig.baseUrl}`;
  private readonly REGISTER_HOST_URL = `${this.baseUrl}user/create/host`;
  private readonly REGISTER_CLIENT_URL = `${this.baseUrl}user/create/client`;
  private readonly CURRENT_USER_URL = `${this.baseUrl}user/current`;
  private readonly LOGIN_URL = `${this.baseUrl}user/login`;
  private token: string | null = null;

  /**
   * Emmited when a user is changed.
   */
  public userChange$ = new BehaviorSubject<User>(null);

  /**
   * @constructor.
   *
   * @param http Http client.
   * @param appConfig App configuration.
   */
  public constructor(
    private readonly http: HttpClient,
    private readonly appConfig: AppConfig,
  ) { }

  /**
   * Login request.
   *
   * @param email - Email.
   * @param password - Password.
   */
  public login(email: string, password: string): Observable<number> {
    const body = {
      email,
      password,
    };
    return this.http.post<LoginDto>(this.LOGIN_URL, body)
      .pipe(
        tap((data) => {
          this.saveToken(data);
          this.userChange$.next(this.createUser(data));
        }),
        map((data) => data.role),
        catchError((err) => throwError(this.mapApiLoginError(err))),
      );
  }

  public clientLogin(email: string, password: string): Observable<any> {
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

  /**
   * Register a host.
   *
   * @param data Data for registration.
   */
  public registerHost(data: HostRegistrationData): Observable<void> {
    const formData = this.generateFormDataForHostRegistration(data);
    return this.http.post<LoginDto>(this.REGISTER_HOST_URL, formData)
      .pipe(
        mapTo(null),
        catchError((err) => {
          if (err.error.email && err.error.email[0] === API_ERRORS.email) {
            return throwError(new Error('Выбранный email уже занят.'));
          }
          return throwError(err);
        }),
      );
  }

  /**
   * Register a client.
   *
   * @param data Data for registration.
   */
  public registerClient(data: ClientRegistrationData): Observable<void> {
    const body = {
      email: data.email,
      password: data.pass,
    };
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'form-data');
    return this.http.post<LoginDto>(this.REGISTER_CLIENT_URL, body, { headers })
      .pipe(
        tap((res) => {
          this.saveToken(res);
          this.userChange$.next(this.createUser(res));
        }),
        mapTo(null),
        catchError((err) => {
          if (err.error.email && err.error.email[0] === API_ERRORS.email) {
            return throwError(new Error('Выбранный email уже занят.'));
          }
          return throwError(err);
        }),
      );
  }

  /**
   * Gets authorization token.
   */
  public getAuthToken(): string {
    return this.token;
  }

  /**
   * Attempt to get current user.
   */
  public getCurrentUser(): void {
    const token = localStorage.getItem(StorageKeys.token);
    if (!token) {
      this.userChange$.next(null);
      return;
    }
    this.token = token;
    this.http.get<LoginDto>(this.CURRENT_USER_URL)
      .pipe(
        first(),
        catchError((err) => {
          this.clearStorage();
          return throwError(err);
        }),
      )
      .subscribe((res) => this.userChange$.next(this.createUser(res)));
  }

  /**
   * Make logout.
   */
  public logout(): void {
    this.token = '';
    this.clearStorage();
    this.userChange$.next(null);
  }

  private saveToken(authData: LoginDto): void {
    this.token = authData.token;
    localStorage.setItem(StorageKeys.token, this.token);
  }

  private createUser(authData: LoginDto): User {
    return new User({
      id: authData.id,
      role: authData.role === 1 ? Role.Host : Role.Client,
    });
  }

  private clearStorage(): void {
    localStorage.setItem(StorageKeys.token, '');
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

  private mapApiLoginError(error: HttpErrorResponse): Error {
    const msg = error.error.error;
    if (msg === API_ERRORS.credentials) {
      return new Error('Некорректный логин или пароль');
    }
    if (msg === API_ERRORS.unconfirmed) {
      return new Error('Ваш аккаунт ещё не потверждён');
    }
    if (msg === API_ERRORS.wrongRole) {
      return new Error('К сожалению, это приложение предназначено только для участников');
    }
    return error;
  }
}
