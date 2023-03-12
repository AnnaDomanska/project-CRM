import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'passwordErrors',
  standalone: true
})
export class PasswordErrorsPipe implements PipeTransform {

  transform(value: ValidationErrors | null | undefined): string {
    if (value === null || value === undefined) return '';
    if (value['required']) return 'Password is required';
    if (value['minlength']) return 'Password must contain minimum 8 characters';
    if (value['smallCharacter'])
      return 'Password must contain at least 1 small character';
    if (value['capitalCharacter'])
      return 'Password must contain at least 1 capital character';
    if (value['numberCharacter'])
      return 'Password must contain at least 1 number character';
    if (value['specialCharacter'])
      return 'Password must contain at least 1 special character: !@#$%^*()';
    return 'Password is invalid';
  }

}