import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((e) => {
        if (e.status === 403) {
          return this._authService.refreshToken().pipe(
            take(1),
            switchMap((resp) => {
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${resp.accessToken}`,
                },
              });
              return next.handle(newRequest);
            })
          );
        }
        return throwError(() => e);
      })
    );
  }
}
