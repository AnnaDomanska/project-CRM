import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, Observable, take, of, map } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({ providedIn: 'root' })
export class NotLoggedInGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    console.log('nli activated')
    return this._userService.getUserData().pipe(
      take(1),
      catchError((e: HttpErrorResponse) => {
        return of('error');
      }),
      map((resp) => {
        return resp === 'error' ? this._router.parseUrl('auth/login') : true;
      })
    );
  }
}
