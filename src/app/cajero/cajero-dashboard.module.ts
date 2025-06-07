import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CajeroDashboardComponent } from './cajero-dashboard.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DashboardModule } from '../dashboard/dashboard.module';
import { CajeroDashboardRoutingModule } from './cajero-dashboard-routing.module';

@NgModule({
  declarations: [CajeroDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    DashboardModule,
    CajeroDashboardRoutingModule
  ],
  exports: [CajeroDashboardComponent]
})
export class CajeroDashboardModule {} 