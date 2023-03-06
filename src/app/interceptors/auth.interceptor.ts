import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const blackList = ['auth/login'];
    if (blackList.find((url) => request.url.endsWith(url))) {
      return next.handle(request);
    } else {
      return this._authService.accessToken$.pipe(
        switchMap((token) => {
          const newRequest = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next.handle(newRequest);
        })
      );
    }
  }
}
