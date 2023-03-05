import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';
import { LeadsComponent } from './components/leads/leads.component';
import { BioComponent } from './components/bio/bio.component';
import { LoginComponentModule } from './components/login/login.component-module';
import { RegisterComponentModule } from './components/register/register.component-module';
import { VerifyComponentModule } from './components/verify/verify.component-module';
import { LeadsComponentModule } from './components/leads/leads.component-module';
import { BioComponentModule } from './components/bio/bio.component-module';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/register', component: RegisterComponent },
      { path: 'verify', component: VerifyComponent },
      { path: 'leads', component: LeadsComponent },
      { path: 'complete-profile', component: BioComponent }
    ]),
    LoginComponentModule,
    RegisterComponentModule,
    VerifyComponentModule,
    LeadsComponentModule,
    BioComponentModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
