import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-lead',
  styleUrls: ['./create-lead.component.scss'],
  templateUrl: './create-lead.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateLeadComponent {
  readonly createLeadForm: FormGroup = new FormGroup({
    name: new FormControl(),
    websiteLink: new FormControl(),
    location: new FormControl(),
    industry: new FormControl(),
    annualRevenue: new FormControl(),
    activities: new FormControl(),
    totalSize: new FormControl(),
    devSize: new FormControl(),
    feSize: new FormControl(),
    hiring: new FormControl(),
    status: new FormControl(),
    notes: new FormControl(),
  });
}
