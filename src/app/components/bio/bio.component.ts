import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

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

    return !bioContent.match(/(\S{1,}\s{1,}){9,}/)
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

  readonly bioContent: FormControl = new FormControl('', [
    Validators.required,
    this.sentencesValidator,
    this.wordsValidator,
  ]);
}
