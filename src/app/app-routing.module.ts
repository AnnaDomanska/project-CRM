import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponentModule } from './components/login/login.component-module';
import { RegisterComponentModule } from './components/register/register.component-module';

@NgModule({
  imports: [
    RouterModule.forRoot([{ path: 'auth/login', component: LoginComponent }, { path: 'auth/register', component: RegisterComponent }]),
    LoginComponentModule,
    RegisterComponentModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
