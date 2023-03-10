import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { ActivityModel } from 'src/app/models/activity.model';
import { LeadModel } from 'src/app/models/lead.model';
import { LeadQueryModel } from 'src/app/query-models/lead.query-model';
import { AuthService } from 'src/app/services/auth.service';
import { LeadsService } from 'src/app/services/leads.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-leads-table',
  styleUrls: ['./leads-table.component.scss'],
  templateUrl: './leads-table.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsTableComponent {
  
  readonly leads$: Observable<LeadQueryModel[]> = combineLatest([
    this._leadsService.getLeads(),
    this._leadsService.getActivities(),
  ]).pipe(
    map(([leads, activities]: [LeadModel[], ActivityModel[]]) =>
      this._mapToLeadQueryModel(leads, activities)
    )
  );
  readonly isAdmin$: Observable<boolean> = this._userService.getUserData().pipe(
    map((resp) => {
      return resp.role === 'admin' ? true : false;
    })
  );

  constructor(
    private _userService: UserService,
    private _leadsService: LeadsService
  ) {}

  private _mapToLeadQueryModel(
    leads: LeadModel[],
    activities: ActivityModel[]
  ): LeadQueryModel[] {
    const activitiesMap = activities.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.id]: curr,
      }),
      {}
    ) as Record<string, ActivityModel>;

    return leads.map((lead) => {
      return {
        name: lead.name,
        websiteLink: lead.websiteLink.includes('http')
          ? lead.websiteLink
          : `http://${lead.websiteLink}`,
        linkedinLink: lead.linkedinLink === 'string' ? '' : lead.linkedinLink,
        scopes: (lead.activityIds ?? []).map((id) => activitiesMap[id]?.name),
        hiring: lead.hiring,
        industry: lead.industry === 'string' ? '' : lead.industry,
        location: lead.location === 'string' ? '' : lead.location,
        size: lead.companySize,
        revenue: lead.annualRevenue,
      };
    });
  }
}
