import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerifyComponent } from '../components/verify/verify.component';
import { LeadsComponent } from '../components/leads/leads.component';
import { BioComponent } from '../components/bio/bio.component';
import { LoggedOutComponent } from '../components/logged-out/logged-out.component';
import { LoginComponentModule } from '../components/login/login.component-module';
import { RegisterComponentModule } from '../components/register/register.component-module';
import { VerifyComponentModule } from '../components/verify/verify.component-module';
import { LeadsComponentModule } from '../components/leads/leads.component-module';
import { BioComponentModule } from '../components/bio/bio.component-module';
import { LoggedOutComponentModule } from '../components/logged-out/logged-out.component-module';
import { AutoLoginGuard } from '../guards/auto-login/auto-login.guard';
import { VerifyGuard } from '../guards/verify/verify.guard';
import { CompleteProfileGuard } from '../guards/complete-profile/complete-profile.guard';
import { NotLoggedInGuard } from '../guards/not-logged-in/not-logged-in.guard';
import { AuthRoutesModule } from './auth.routes';
import { CreateLeadComponentModule } from '../components/create-lead/create-lead.component-module';
import { LeadsRoutesModule } from './leads.routes';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'auth',
        canActivate: [AutoLoginGuard],
        loadChildren: () => AuthRoutesModule,
        data: { redirectUrlLeads: '/leads' },
      },
      {
        path: 'verify',
        component: VerifyComponent,
        canActivate: [NotLoggedInGuard],
        data: { redirectUrlLogin: '/auth/login' },
      },
      {
        path: '',
        component: LeadsComponent,
        canActivate: [NotLoggedInGuard, VerifyGuard, CompleteProfileGuard],
        loadChildren: () => LeadsRoutesModule,
        data: {
          redirectUrlLogin: '/auth/login',
          redirectUrlVerify: '/verify',
          redirectUrlCompleteProfile: '/complete-profile',
        },
      },
      {
        path: 'complete-profile',
        component: BioComponent,
        canActivate: [NotLoggedInGuard],
        data: { redirectUrlLogin: '/auth/login' },
      },
      { path: 'logged-out', component: LoggedOutComponent },
    ]),
    LoginComponentModule,
    RegisterComponentModule,
    VerifyComponentModule,
    LeadsComponentModule,
    BioComponentModule,
    LoggedOutComponentModule,
    CreateLeadComponentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
