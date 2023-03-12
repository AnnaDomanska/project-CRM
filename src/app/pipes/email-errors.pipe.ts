import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'emailErrors',
  standalone: true
})
export class EmailErrorsPipe implements PipeTransform {

  transform(value: ValidationErrors | null | undefined): string {

    if(value === null || value === undefined) return '';
    if(value['required']) return 'Email is required';
    if(value['email']) return 'You need to provide valid email';

    return 'Email is invalid';
  }

}