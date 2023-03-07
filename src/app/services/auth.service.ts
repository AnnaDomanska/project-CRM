import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CredentialsModel } from '../models/credentials.model';
import { CredentialsResponse } from '../responses/credentials.response';
import { ApiResponse } from '../responses/api.response';
import { RegisterUserResponse } from '../responses/register-user.response';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _accessTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(this._storage.getItem('accessToken'));
  public accessToken$: Observable<string | null> =
    this._accessTokenSubject.asObservable();
  private _refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(this._storage.getItem('refreshToken'));
  public refreshToken$: Observable<string | null> =
    this._refreshTokenSubject.asObservable();

  constructor(private _httpClient: HttpClient, private _storage: Storage) {}

  login(
    loginData: CredentialsModel,
    isRemembered: boolean
  ): Observable<CredentialsResponse> {
    return this._httpClient
      .post<ApiResponse<CredentialsResponse>>(
        `${environment.apiUrl}auth/login`,
        { data: loginData }
      )
      .pipe(
        map((resp) => resp.data),
        tap((data) => {
          this._accessTokenSubject.next(data.accessToken);
          this._refreshTokenSubject.next(data.refreshToken);

          if (isRemembered) {
            this.setUserToStorage(data);
          }
        })
      );
  }

  register(registerData: CredentialsModel): Observable<RegisterUserResponse> {
    return this._httpClient
      .post<ApiResponse<RegisterUserResponse>>(
        `${environment.apiUrl}auth/register2`,
        { data: registerData }
      )
      .pipe(map((resp) => resp.data));
  }

  logout(): void {
    this._accessTokenSubject.next(null);
    this._refreshTokenSubject.next(null);
    this.removeUserFromStorage();
  }

  setUserToStorage(userData: CredentialsResponse): void {
    this._storage.setItem('accessToken', userData.accessToken);
    this._storage.setItem('refreshToken', userData.refreshToken);
  }

  removeUserFromStorage(): void {
    this._storage.removeItem('accessToken');
    this._storage.removeItem('refreshToken');
  }
}
