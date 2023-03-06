import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take, map, catchError, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({ providedIn: 'root' })
export class AutoLoginGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._userService.getUserData().pipe(
      take(1),
      catchError((e: HttpErrorResponse) => {
        return of('error');
      }),
      map((resp) => {
        return resp !== 'error' ? this._router.parseUrl('leads') : true;
      })
    );
  }
}
