import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeadQueryModel } from '../../query-models/lead.query-model';
import { LeadModel } from '../../models/lead.model';
import { ActivityModel } from '../../models/activity.model';
import { UserService } from '../../services/user.service';
import { LeadsService } from '../../services/leads.service';
import { CompanySizeOptionQueryModel } from 'src/app/query-models/company-size-option.query-model';

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

  readonly companySizeList$: Observable<CompanySizeOptionQueryModel[]> = of([
    { name: '0-50', min: 0, max: 50 },
    { name: '51-100', min: 51, max: 100 },
    { name: '101-500', min: 101, max: 500 },
    { name: '501-1000', min: 501, max: 1000 },
    { name: '1001', min: 1001, max: null },
  ]).pipe(tap((data) => this.createSizeFormControls(data)));

  private _filterModalStatusSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public filterModalStatus$: Observable<boolean> =
    this._filterModalStatusSubject.asObservable();

  readonly sizeFilterForm: FormGroup = new FormGroup({});
  readonly scopeFilterForm: FormGroup = new FormGroup({});

  readonly filterForm: FormGroup = new FormGroup({
    sizeFilter: this.sizeFilterForm,
    scopeFilter: this.scopeFilterForm,
  });
  readonly activities$: Observable<ActivityModel[]> = this._leadsService
    .getActivities()
    .pipe(tap((data) => this.createActivitiesFormControls(data)));

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

  ngAfterViewInit(): void {
    this.filterForm.valueChanges.pipe(tap((data) => console.log(data))).subscribe()
  }
  showFilterModal(): void {
    this._filterModalStatusSubject.next(true);
  }

  hideFilterModal(): void {
    this._filterModalStatusSubject.next(false);
  }

  createActivitiesFormControls(activities: ActivityModel[]): void {
    activities.forEach((activity) =>
      this.scopeFilterForm.addControl(activity.id, new FormControl(false))
    );
  }

  createSizeFormControls(sizeOptions: CompanySizeOptionQueryModel[]): void {
    sizeOptions.forEach((sizeOption) =>
      this.sizeFilterForm.addControl(sizeOption.name, new FormControl(false))
    );
  }

}
