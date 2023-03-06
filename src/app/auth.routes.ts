import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginComponentModule } from './components/login/login.component-module';
import { RegisterComponent } from './components/register/register.component';
import { RegisterComponentModule } from './components/register/register.component-module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]),
    LoginComponentModule,
    RegisterComponentModule,
  ],
  exports: [RouterModule],
})
export class AuthRoutesModule {}
