import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';

import { BaseAuthService } from './auth.service';

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
    private readonly authService: BaseAuthService,
  ) {
    this.currentUser$ = this.authService.userChange$;
  }
}
