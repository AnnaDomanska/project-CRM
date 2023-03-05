import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CredentialsModel } from '../models/credentials.model';
import { CredentialsResponse } from '../responses/credentials.response';
import { ApiResponse } from '../responses/api.response';
import { RegisterUserResponse } from '../responses/register-user.response';

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

  login(loginData: CredentialsModel): Observable<CredentialsResponse> {
    return this._httpClient
      .post<ApiResponse<CredentialsResponse>>(
        `https://us-central1-courses-auth.cloudfunctions.net/auth/login`,
        { data: loginData }
      )
      .pipe(
        map((resp) => resp.data),
        tap((data) => {
          this._accessTokenSubject.next(data.accessToken);
          this._refreshTokenSubject.next(data.refreshToken);
      
        })
      );
  }

  register(registerData: CredentialsModel): Observable<RegisterUserResponse> {
    return this._httpClient
      .post<ApiResponse<RegisterUserResponse>>(
        `https://us-central1-courses-auth.cloudfunctions.net/auth/register2`,
        { data: registerData }
      )
      .pipe(map((resp) => resp.data));
  }

  setUserToStorage(userData: CredentialsResponse): void {
    this._storage.setItem('accessToken', userData.accessToken);
    this._storage.setItem('refreshToken', userData.refreshToken);
  }
}
