import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LeadsComponent } from './leads.component';

@NgModule({
  imports: [CommonModule, RouterLink],
  declarations: [LeadsComponent],
  providers: [],
  exports: [LeadsComponent],
})
export class LeadsComponentModule {}
