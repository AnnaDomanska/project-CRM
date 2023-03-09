import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeadModel } from '../models/lead.model';
import { ActivityModel } from '../models/activity.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LeadsService {
  constructor(private _httpClient: HttpClient) {}

  getLeads(): Observable<LeadModel[]> {
    return this._httpClient.get<LeadModel[]>(`${environment.apiUrl}leads`);
  }

  getActivities(): Observable<ActivityModel[]> {
    return this._httpClient.get<ActivityModel[]>(
      `${environment.apiUrl}leads/activities`
    );
  }
}
