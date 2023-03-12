import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, of, tap } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LeadQueryModel } from '../../query-models/lead.query-model';
import { LeadModel } from '../../models/lead.model';
import { ActivityModel } from '../../models/activity.model';
import { UserService } from '../../services/user.service';
import { LeadsService } from '../../services/leads.service';
import { CompanySizeOptionQueryModel } from 'src/app/query-models/company-size-option.query-model';
import { FilterValuesQueryModel } from 'src/app/query-models/filter-values.query-model';
import { UIService } from 'src/app/services/UI.service';

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

  readonly filterModalStatus$: Observable<boolean> =
    this._UIService.filterModalStatus$;

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
    private _leadsService: LeadsService,
    private _UIService: UIService
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
        scopesIds: lead.activityIds,
        hiring: lead.hiring,
        industry: lead.industry === 'string' ? '' : lead.industry,
        location: lead.location === 'string' ? '' : lead.location,
        size: lead.companySize,
        revenue: lead.annualRevenue,
      };
    });
  }

  readonly selectedScopes$: Observable<string[]> =
    this.scopeFilterForm.valueChanges.pipe(
      startWith([]),
      map((scopes) =>
        Object.keys(scopes).reduce((prev: string[], curr: string) => {
          if (scopes[curr]) {
            return [...prev, curr];
          }
          return prev;
        }, [])
      )
    );

  readonly selectedSizes$: Observable<string[]> =
    this.sizeFilterForm.valueChanges.pipe(
      startWith([]),
      map((sizeOptions) =>
        Object.keys(sizeOptions).reduce((prev: string[], curr: string) => {
          if (sizeOptions[curr]) {
            return [...prev, curr];
          }
          return prev;
        }, [])
      )
    );

  readonly currentFilterValues$: Observable<FilterValuesQueryModel> =
    combineLatest([
      this.selectedScopes$,
      this.selectedSizes$,
      this.companySizeList$,
    ]).pipe(
      map(([scopes, sizes, sizeList]) => {
        const sizeMap = sizeList.reduce(
          (prev, curr) => ({ ...prev, [curr.name]: curr }),
          {} as Record<string, CompanySizeOptionQueryModel>
        );
        return {
          scopes: new Set<string>(scopes),
          sizes: sizes.map((sizeName) => sizeMap[sizeName]),
        };
      })
    );

  readonly filteredLeads$: Observable<LeadQueryModel[]> = combineLatest([
    this.leads$,
    this.currentFilterValues$,
  ]).pipe(
    map(([leads, currenFilterValues]) => {
      return leads
        .filter((lead) =>
          currenFilterValues.scopes.size !== 0
            ? lead.scopesIds.find((scopeId: string) =>
                currenFilterValues.scopes.has(scopeId)
              )
            : true
        )
        .filter((lead) =>
          currenFilterValues.sizes.length !== 0
            ? currenFilterValues.sizes.find(
                (size) =>
                  lead.size.total >= size.min &&
                  (size.max ? lead.size.total <= size.max : true)
              )
            : true
        );
    })
  );

  resetFilterForm(): void {
    this.filterForm.reset();
  }

  showFilterModal(): void {
    this._UIService.showFilterModal();
  }

  hideFilterModal(): void {
    this._UIService.hideFilterModal();
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
