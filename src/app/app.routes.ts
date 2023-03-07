import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';
import { LeadsComponent } from './components/leads/leads.component';
import { BioComponent } from './components/bio/bio.component';
import { LoggedOutComponent } from './components/logged-out/logged-out.component';
import { LoginComponentModule } from './components/login/login.component-module';
import { RegisterComponentModule } from './components/register/register.component-module';
import { VerifyComponentModule } from './components/verify/verify.component-module';
import { LeadsComponentModule } from './components/leads/leads.component-module';
import { BioComponentModule } from './components/bio/bio.component-module';
import { LoggedOutComponentModule } from './components/logged-out/logged-out.component-module';
import { AutoLoginGuard } from './guards/auto-login/auto-login.guard';
import { VerifyGuard } from './guards/verify/verify.guard';
import { CompleteProfileGuard } from './guards/complete-profile/complete-profile.guard';
import { NotLoggedInGuard } from './guards/not-logged-in/not-logged-in.guard';
import { AuthRoutesModule } from './auth.routes';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: AppComponent, canActivate: [AutoLoginGuard, NotLoggedInGuard]
      },
      {
        path: 'auth',
        canActivate: [AutoLoginGuard],
        loadChildren: () => AuthRoutesModule,
      },
      {
        path: 'verify',
        component: VerifyComponent,
        canActivate: [NotLoggedInGuard],
      },
      {
        path: 'leads',
        component: LeadsComponent,
        canActivate: [NotLoggedInGuard, VerifyGuard, CompleteProfileGuard],
      },
      {
        path: 'complete-profile',
        component: BioComponent,
        canActivate: [NotLoggedInGuard],
      },
      { path: 'logged-out', component: LoggedOutComponent },
    ]),
    LoginComponentModule,
    RegisterComponentModule,
    VerifyComponentModule,
    LeadsComponentModule,
    BioComponentModule,
    LoggedOutComponentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
