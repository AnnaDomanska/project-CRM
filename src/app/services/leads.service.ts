import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeadModel } from '../models/lead.model';
import { ApiResponse } from '../responses/api.response';
import { ActivityModel } from '../models/activity.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LeadsService {
  constructor(private _httpClient: HttpClient) {}

  getLeads(): Observable<LeadModel[]> {
    return this._httpClient
      .get<ApiResponse<LeadModel[]>>(`${environment.apiUrl}leads`)
      .pipe(map((resp) => resp.data));
  }

  getActivities(): Observable<ActivityModel[]> {
    return this._httpClient
      .get<ApiResponse<ActivityModel[]>>(
        `${environment.apiUrl}leads/activities`
      )
      .pipe(map((resp) => resp.data));
  }

  createLead(leadData: LeadModel): Observable<any> {
    return this._httpClient.post<any>(
      `https://us-central1-courses-auth.cloudfunctions.net/leads`,
      { data: leadData }
    );
  }
}
