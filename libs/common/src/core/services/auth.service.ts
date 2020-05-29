import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { tap, catchError, mapTo, first } from 'rxjs/operators';

import { UserMapper } from '../mappers/user.mapper';
import { ClientRegistrationData } from '../models/registration-data';
import { User } from '../models/user';

import { AppConfig } from './app-config.service';
import { AuthDto } from './dto/login-dto';

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
 * Base authorization service.
 * Extended by web and mobiles auth services.
 */
export class BaseAuthService {
  private readonly baseUrl = `${this.appConfig.baseUrl}`;
  private readonly REGISTER_CLIENT_URL = `${this.baseUrl}user/create/client`;
  private readonly CURRENT_USER_URL = `${this.baseUrl}user/me`;
  private token: string | null = null;

  /** Login url */
  public readonly LOGIN_URL = `${this.baseUrl}user/login`;

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
    protected readonly http: HttpClient,
    protected readonly appConfig: AppConfig,
    protected readonly userMapper: UserMapper,
  ) { }

  /**
   * Register a client.
   *
   * @param data Data for registration.
   */
  public registerClient(data: ClientRegistrationData): Observable<void> {
    const body = {
      email: data.email,
      password: data.pass,
      name: data.name,
    };
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'form-data');
    return this.http.post<AuthDto>(this.REGISTER_CLIENT_URL, body, { headers })
      .pipe(
        tap((res) => {
          this.saveToken(res);
          this.userChange$.next(this.createUser(res));
        }),
        mapTo(null),
        catchError((err) => throwError(this.mapApiRegistrationError(err))),
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
  public getCurrentUser(): Observable<boolean> {
    const token = localStorage.getItem(StorageKeys.token);
    if (!token) {
      this.userChange$.next(null);
      return of(false);
    }
    this.token = token;
    return this.http.get<AuthDto>(this.CURRENT_USER_URL)
      .pipe(
        first(),
        tap((res) => this.userChange$.next(this.createUser(res))),
        mapTo(true),
        catchError((err) => {
          this.clearStorage();
          return throwError(err);
        }),
      );
  }

  /**
   * Make logout.
   */
  public logout(): void {
    this.token = '';
    this.clearStorage();
    this.userChange$.next(null);
  }

  /**
   * Save token to local storage.
   * @param authData Authentication data.
   */
  protected saveToken(authData: AuthDto): void {
    this.token = authData.token;
    localStorage.setItem(StorageKeys.token, this.token);
  }

  /**
   * Create new user
   * @param authData Authentication data.
   */
  protected createUser(authData: AuthDto): User {
    return this.userMapper.fromDto(authData);
  }

  private clearStorage(): void {
    localStorage.setItem(StorageKeys.token, '');
  }

  /**
   * Map api login errors to Error object.
   * @param error Http error.
   */
  protected mapApiLoginError(error: HttpErrorResponse): Error {
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

  /**
   * Map api registration error to Error object.
   * @param error Http error.
   */
  protected mapApiRegistrationError(error: HttpErrorResponse): Error {
    if (error.error.email && error.error.email[0] === API_ERRORS.email) {
      return new Error('Выбранный email уже занят.');
    }
    return error;
  }
}
