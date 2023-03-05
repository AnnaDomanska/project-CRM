import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CredentialsModel } from '../models/credentials.model';
import { CredentialsResponse } from '../responses/credentials.response';
import { ApiResponse } from '../responses/api.response';
import { UserResponse } from '../responses/user.response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  login(loginData: CredentialsModel): Observable<CredentialsResponse> {
    return this._httpClient
      .post<ApiResponse<CredentialsResponse>>(
        `https://us-central1-courses-auth.cloudfunctions.net/auth/login`,
        { data: loginData }
      )
      .pipe(map((resp) => resp.data));
  }

  register(registerData: CredentialsModel): Observable<UserResponse> {
    return this._httpClient
      .post<ApiResponse<UserResponse>>(
        `https://us-central1-courses-auth.cloudfunctions.net/auth/register2`,
        { data: registerData }
      )
      .pipe(map((resp) => resp.data));
  }
}
