import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SummaryCardsComponent } from './components/summary-cards.component';
import { DashboardChartComponent } from './components/dashboard-chart.component';
import { DashboardTableComponent } from './components/dashboard-table.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TitleCasePipe } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SummaryCardsComponent,
    DashboardChartComponent,
    DashboardTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    NgChartsModule,
    LayoutModule
  ],
  providers: [
    TitleCasePipe
  ],
  exports: [
    DashboardComponent,
    SummaryCardsComponent,
    DashboardChartComponent,
    DashboardTableComponent
  ]
})
export class DashboardModule {} 