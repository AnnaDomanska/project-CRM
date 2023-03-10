import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateLeadComponent } from './create-lead.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  declarations: [CreateLeadComponent],
  providers: [],
  exports: [CreateLeadComponent],
})
export class CreateLeadComponentModule {}
