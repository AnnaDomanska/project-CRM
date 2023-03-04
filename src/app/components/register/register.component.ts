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

@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  smallLettersValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password: string = control.value;

    if (password === null) {
      return null;
    }

    return !password.match(/[a-z]/) ? { smallLettersValidator: true } : null;
  };

  capitalLettersValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password: string = control.value;

    if (password === null) {
      return null;
    }

    return !password.match(/[A-Z]/) ? { capitalLettersValidator: true } : null;
  };

  numberValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password: string = control.value;

    if (password === null) {
      return null;
    }

    return !password.match(/[0-9]/) ? { numberValidator: true } : null;
  };

  specialValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password: string = control.value;

    if (password === null) {
      return null;
    }

    return !password.match(/[!@#$%^*()]/) ? { specialValidator: true } : null;
  };

  confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;

    return password !== repeatPassword
      ? { confirmPasswordValidator: true }
      : null;
  };

  readonly registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(8),
        this.smallLettersValidator,
        this.capitalLettersValidator,
        this.numberValidator,
        this.specialValidator,
      ]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', Validators.required),
      terms: new FormControl(false, Validators.requiredTrue),
    },
    { validators: this.confirmPasswordValidator }
  );
}
``;
