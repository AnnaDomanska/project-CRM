import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeadQueryModel } from '../../query-models/lead.query-model';
import { LeadModel } from '../../models/lead.model';
import { ActivityModel } from '../../models/activity.model';
import { UserService } from '../../services/user.service';
import { LeadsService } from '../../services/leads.service';

@Component({
  selector: 'app-leads-table',
  styleUrls: ['./leads-table.component.scss'],
  templateUrl: './leads-table.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  private _filterModalStatusSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public filterModalStatus$: Observable<boolean> =
    this._filterModalStatusSubject.asObservable();

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

  showFilterModal(): void {
    this._filterModalStatusSubject.next(true);
  }

  hideFilterModal(): void {
    this._filterModalStatusSubject.next(false);
  }
}
