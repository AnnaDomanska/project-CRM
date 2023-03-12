import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'sizeErrors',
  standalone: true,
})
export class SizeErrorsPipe implements PipeTransform {
  transform(value: ValidationErrors | null | undefined): string {
    if (value === null || value === undefined) return '';
    if (value['required']) return 'Total size is required and must be a number';
    if (value['min']) return 'Minimum value is 1';

    return 'Password is invalid';
  }
}
