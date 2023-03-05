import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, shareReplay } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ApiResponse } from '../responses/api.response';
import { UserResponse } from '../responses/user.response';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _user$: Observable<UserModel> = this._httpClient
    .get<ApiResponse<UserResponse>>(
      'https://us-central1-courses-auth.cloudfunctions.net/auth/me'
    )
    .pipe(
      map((resp) => resp.data.user.context),
      shareReplay(1)
    );

  constructor(private _httpClient: HttpClient) {}

  getUserData(): Observable<UserModel> {
    return this._user$;
  }

  getUserBio(): Observable<any> {
    return this._httpClient.get<any>(
      `https://us-central1-courses-auth.cloudfunctions.net/auth/my-bio`
    );
  }

  postUserBio(bio: string): Observable<void> {
    return this._httpClient.post<void>(
      `https://us-central1-courses-auth.cloudfunctions.net/auth/add-bio`,
      { data: bio }
    );
  }
}
