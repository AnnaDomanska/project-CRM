import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailErrorsPipe } from 'src/app/pipes/email-errors.pipe';
import { PasswordErrorsPipe } from 'src/app/pipes/password-errors.pipe';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    EmailErrorsPipe,
    PasswordErrorsPipe,
  ],
  declarations: [LoginComponent],
  providers: [],
  exports: [LoginComponent],
})
export class LoginComponentModule {}
