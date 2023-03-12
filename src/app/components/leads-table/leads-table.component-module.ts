import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LeadsTableComponent } from './leads-table.component';

@NgModule({
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  declarations: [LeadsTableComponent],
  providers: [],
  exports: [LeadsTableComponent],
})
export class LeadsTableComponentModule {}
