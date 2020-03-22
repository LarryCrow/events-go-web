import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import { Role } from '../models/role.enum';

/**
 * Checks if the current user is a host
 */
@Injectable({
  providedIn: 'root',
})
export class IsHostGuard implements CanActivate {

  /**
   * @constructor
   *
   * @param userService User service.
   */
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) { }

  /**
   * @inheritdoc
   *
   * @param next Route snapshot.
   * @param state Router state snapshot.
   */
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.currentUser$
      .pipe(
        map((user) => {
          const isHost = user && user.role === Role.Host;
          if (!isHost) {
            this.router.navigate(['/events']);
          }
          return isHost;
        }),
      );
  }

}
