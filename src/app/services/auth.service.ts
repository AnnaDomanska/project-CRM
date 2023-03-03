import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsModel } from '../models/credentials.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  login(loginData: CredentialsModel): Observable<any> {
    return this._httpClient.post(
      `https://us-central1-courses-auth.cloudfunctions.net/auth/login`,
      { data: loginData }
    );
  }
}
