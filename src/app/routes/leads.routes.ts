import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateLeadComponent } from '../components/create-lead/create-lead.component';
import { CreateLeadComponentModule } from '../components/create-lead/create-lead.component-module';
import { LeadsTableComponent } from '../components/leads-table/leads-table.component';
import { LeadsTableComponentModule } from '../components/leads-table/leads-table.component-module';
import { AdminGuard } from '../guards/admin/admin.guard';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'leads', component: LeadsTableComponent },
      {
        path: 'create-lead',
        component: CreateLeadComponent,
        canActivate: [AdminGuard],
      },
      { path: '', redirectTo: 'leads', pathMatch: 'full' },
    ]),
    LeadsTableComponentModule,
    CreateLeadComponentModule,
  ],
  exports: [RouterModule],
})
export class LeadsRoutesModule {}
