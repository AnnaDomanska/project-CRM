import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
  readonly activitiesForm: FormGroup = new FormGroup({});
  readonly activities$: Observable<ActivityModel[]> =
    this._leadsService.getActivities();

  constructor(private _leadsService: LeadsService) {}

  onCreateLeadFormSubmitted(createLeadForm: FormGroup) {
    console.log(createLeadForm.value);
  }

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
        /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
      ),
    ]),
    location: new FormControl('', [Validators.required]),
    industry: new FormControl('', [Validators.required]),
    annualRevenue: new FormControl('', [Validators.required]),
    activities: this.activitiesForm,
    totalSize: new FormControl('', [Validators.required, Validators.min(0)]),
    devSize: new FormControl('', [Validators.required, Validators.min(0)]),
    feSize: new FormControl('', [Validators.required, Validators.min(0)]),
    hiring: this.hiringForm,
    status: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
  });
}
