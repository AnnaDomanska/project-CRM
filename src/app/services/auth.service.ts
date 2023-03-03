import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CredentialsModel } from '../models/credentials.model';
import { ApiResponse } from '../responses/api.response';
import { CredentialsResponse } from '../responses/credentials.response';

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
}
