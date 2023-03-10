import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, shareReplay } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ApiResponse } from '../responses/api.response';
import { UserResponse } from '../responses/user.response';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _user$: Observable<UserModel> = this._httpClient
    .get<ApiResponse<UserResponse>>(`${environment.apiUrl}auth/me`)
    .pipe(
      map((resp) => resp.data.user.context),
      shareReplay(1)
    );


  constructor(private _httpClient: HttpClient, private _storage: Storage) {}

  getUserData(): Observable<UserModel> {
    return this._user$;
  }

  getUserBio(): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiUrl}auth/my-bio`);
  }

  postUserBio(bio: string): Observable<void> {
    return this._httpClient.post<void>(`${environment.apiUrl}auth/add-bio`, {
      data: { content: bio },
    });
  }

 
}
