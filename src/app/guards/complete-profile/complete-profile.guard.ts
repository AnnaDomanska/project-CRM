import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, Observable, take, throwError, of, map } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable({ providedIn: 'root' })
export class CompleteProfileGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    console.log('complete-profile guard activated');
    return this._userService.getUserBio().pipe(
      take(1),
      catchError((e: HttpErrorResponse) => {
        if (e.status === 404) {
          return of('error');
        }
        return throwError(() => e);
      }),
      map((resp) => {
        return resp === 'error'
          ? this._router.parseUrl('complete-profile')
          : true;
      })
    );
  }
}
