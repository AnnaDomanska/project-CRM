import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LeadModel } from '../models/lead.model';
import { ActivityModel } from '../models/activity.model';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../responses/api.response';

@Injectable({ providedIn: 'root' })
export class LeadsService {
  constructor(private _httpClient: HttpClient) {}

  getLeads(): Observable<LeadModel[]> {
    return this._httpClient
      .get<ApiResponse<LeadModel[]>>(`${environment.apiUrl}leads`)
      .pipe(map((resp) => resp.data));
  }

  getActivities(): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiUrl}leads/activities`);
  }
}
