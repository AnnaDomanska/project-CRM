import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivityModel } from '../../models/activity.model';
import { LeadsService } from '../../services/leads.service';

@Component({
  selector: 'app-create-lead',
  styleUrls: ['./create-lead.component.scss'],
  templateUrl: './create-lead.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateLeadComponent {
  minOneCheckedValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const numberOfChecked = Object.keys(control.value).reduce(
      (prev: string[], curr: string) => {
        if (control.value[curr]) {
          return [...prev, curr];
        } else {
          return prev;
        }
      },
      []
    ).length;

    if (numberOfChecked > 0) {
      return null;
    }
    return { minOneChecked: true };
  };

  readonly activitiesForm: FormGroup = new FormGroup({}, [
    this.minOneCheckedValidator,
  ]);
  readonly activities$: Observable<ActivityModel[]> = this._leadsService
    .getActivities()
    .pipe(tap((data) => this.createActivitiesFormControls(data)));

  constructor(
    private _leadsService: LeadsService,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) {}

  readonly hiringForm: FormGroup = new FormGroup({
    active: new FormControl(false),
    junior: new FormControl(false),
    talentProgram: new FormControl(false),
  });

  readonly createLeadForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    websiteLink: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
      ),
    ]),
    linkedinLink: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile|company)/
      ),
    ]),
    location: new FormControl('', [Validators.required]),
    industry: new FormControl('', [Validators.required]),
    annualRevenue: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^[0-9]*$/),
    ]),
    activities: this.activitiesForm,
    totalSize: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]*$/)]),
    devSize: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]*$/)]),
    feSize: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]*$/)]),
    hiring: this.hiringForm,
    status: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
  });

  createActivitiesFormControls(activities: ActivityModel[]): void {
    activities.forEach((activity) =>
      this.activitiesForm.addControl(activity.id, new FormControl(false))
    );
  }

  onCreateLeadFormSubmitted(createLeadForm: FormGroup): void {
    const activityIds = Object.keys(this.activitiesForm.value).reduce(
      (prev: string[], curr: string) => {
        if (this.activitiesForm.value[curr]) {
          return [...prev, curr];
        }
        return prev;
      },
      []
    );
    if (!createLeadForm.valid) {
      return alert('You should complete the entire form!');
    }
    this._leadsService
      .createLead({
        name: createLeadForm.value.name,
        websiteLink: createLeadForm.value.websiteLink,
        linkedinLink: createLeadForm.value.linkedinLink,
        location: createLeadForm.value.location,
        industry: createLeadForm.value.industry,
        annualRevenue: createLeadForm.value.annualRevenue,
        activityIds: activityIds,
        companySize: {
          total: createLeadForm.value.totalSize,
          dev: createLeadForm.value.devSize,
          fe: createLeadForm.value.feSize,
        },
        hiring: {
          active: this.hiringForm.value.active,
          junior: this.hiringForm.value.junior,
          talentProgram: this.hiringForm.value.talentProgram,
        },
      })
      .subscribe({
        next: () => this._router.navigate(['leads']),
        error: (e) => {
          this.createLeadForm.setErrors({ beValidator: e.message });
          this._cdr.detectChanges();
        },
      });
  }
}
