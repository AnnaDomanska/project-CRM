import {
  ChangeDetectionStrategy,
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
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bio',
  styleUrls: ['./bio.component.scss'],
  templateUrl: './bio.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BioComponent {
  wordsValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const bioContent: string = control.value;

    if (bioContent === null) {
      return null;
    }

    return !bioContent.match(/(\S{1,}\s{1,}){10,}/)
      ? { wordsValidator: true }
      : null;
  };

  sentencesValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const bioContent: string = control.value;

    if (bioContent === null) {
      return null;
    }

    return !bioContent.match(/.+[.!?].+\w+/)
      ? { sentencesValidator: true }
      : null;
  };

  readonly bioForm: FormGroup = new FormGroup({
    bioContent: new FormControl('', [
      Validators.required,
      this.sentencesValidator,
      this.wordsValidator,
    ]),
  });

  constructor(private _userService: UserService, private _router: Router) {}

  onBioFormSubmitted(bioForm: FormGroup) {
    this._userService
      .postUserBio(bioForm.get('bioContent')?.value)
      .subscribe({ next: () => this._router.navigate(['leads']) });
  }
}
