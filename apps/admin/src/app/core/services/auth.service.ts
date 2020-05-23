import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserMapper } from '@ego/common/core/mappers/user.mapper';
import { User } from '@ego/common/core/models/user';
import { AppConfig } from '@ego/common/core/services/app-config.service';
import { AuthDto } from '@ego/common/core/services/dto/login-dto';
import { Observable, throwError, of } from 'rxjs';
import { tap, mapTo, catchError, first } from 'rxjs/operators';

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
  wrongRole: 'Inappropriate role',
};

/** Auth service. */
@Injectable({ 'providedIn': 'root' })
export class AuthService {
  private readonly baseUrl = `${this.appConfig.baseUrl}`;
  private readonly CURRENT_USER_URL = `${this.baseUrl}user/me`;
  private token: string | null = null;

  /** Login url */
  public readonly LOGIN_URL = `${this.baseUrl}staff/auth`;

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
   * Gets authorization token.
   */
  public getAuthToken(): string {
    return this.token;
  }

  /**
   * Attempt to get current user.
   */
  public isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem(StorageKeys.token);
    if (!token) {
      return of(false);
    }
    this.token = token;
    return this.http.get<AuthDto>(this.CURRENT_USER_URL)
      .pipe(
        first(),
        tap((res) => this.saveToken(res)),
        mapTo(true),
        catchError((err) => {
          this.clearStorage();
          return throwError(err);
        }),
      );
  }

  /**
 * Login a user.
 * @param email Email
 * @param password Password.
 */
  public login(email: string, password: string): Observable<void> {
    const body = {
      email,
      password,
    };
    return this.http.post<AuthDto>(this.LOGIN_URL, body)
      .pipe(
        tap((data) => this.saveToken(data)),
        mapTo(null),
        catchError((err) => throwError(this.mapApiLoginError(err))),
      );
  }

  /**
   * Make logout.
   */
  public logout(): void {
    this.token = '';
    this.clearStorage();
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
    if (msg === API_ERRORS.wrongRole) {
      return new Error('К сожалению, это приложение предназначено только для рабочего персонала');
    }
    return error;
  }
}
