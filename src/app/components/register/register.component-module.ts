import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailErrorsPipe } from 'src/app/pipes/email-errors.pipe';
import { PasswordErrorsPipe } from 'src/app/pipes/password-errors.pipe';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    EmailErrorsPipe,
    PasswordErrorsPipe,
  ],
  declarations: [RegisterComponent],
  providers: [],
  exports: [RegisterComponent],
})
export class RegisterComponentModule {}
