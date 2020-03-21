import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';

import { AuthService } from './auth.service';

/**
 * Authorization service.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /** Current user. */
  public currentUser$: Observable<User>;

  /**
   * @constructor.
   * @param authService - Authentication service.
   */
  public constructor(
    private readonly authService: AuthService,
  ) {
    this.currentUser$ = this.authService.userChange$;
  }
}
