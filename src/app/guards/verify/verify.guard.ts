import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Injectable({ providedIn: 'root' })
export class VerifyGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._userService.getUserData().pipe(
      take(1),
      map((userData) => {
        return userData.email_verified
          ? true
          : this._router.parseUrl(route.data['redirectUrl'] || 'verify');
      })
    );
  }
}
