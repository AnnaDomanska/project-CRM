import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LeadModel } from '../../models/lead.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { LeadsService } from '../../services/leads.service';
import { ActivityModel } from 'src/app/models/activity.model';
import { LeadQueryModel } from 'src/app/query-models/lead.query-model';

@Component({
  selector: 'app-leads',
  styleUrls: ['./leads.component.scss'],
  templateUrl: './leads.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadsComponent {
  private _dropdownMenuStatusSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public dropdownMenuStatus$: Observable<boolean> =
    this._dropdownMenuStatusSubject.asObservable();

  readonly userEmail$: Observable<string> = this._userService
    .getUserData()
    .pipe(map((data) => data.email));

  readonly leads$: Observable<LeadQueryModel[]> = combineLatest([
    this._leadsService.getLeads(),
    this._leadsService.getActivities(),
  ]).pipe(
    map(([leads, activities]: [LeadModel[], ActivityModel[]]) =>
      this._mapToLeadQueryModel(leads, activities)
    )
  );

  constructor(
    private _authService: AuthService,
    private _router: Router,
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
        linkedinLink: lead.linkedinLink,
        scopes: (lead.activityIds ?? []).map((id) => activitiesMap[id]?.name),
        hiring: lead.hiring,
        industry: lead.industry,
        location: lead.location,
        size: lead.companySize,
        revenue: lead.annualRevenue,
      };
    });
  }

  showMenu(): void {
    this.dropdownMenuStatus$
      .pipe(
        take(1),
        map((actualStatus) =>
          this._dropdownMenuStatusSubject.next(!actualStatus)
        )
      )
      .subscribe();
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['logged-out']);
  }
}
