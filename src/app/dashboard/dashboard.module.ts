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
import { MatIconModule } from '@angular/material/icon';
import { PaymentTypeListComponent } from './components/payment-type-list/payment-type-list.component';
import { PaymentTypeFormComponent } from './components/payment-type-form/payment-type-form.component';
import { SaleStatusListComponent } from './components/sale-status-list/sale-status-list.component';
import { SaleStatusFormComponent } from './components/sale-status-form/sale-status-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { FacturaListComponent } from './components/factura-list/factura-list.component';
import { EmailDialogComponent } from './components/factura-list/email-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DashboardComponent,
    SummaryCardsComponent,
    DashboardChartComponent,
    DashboardTableComponent,
    PaymentTypeListComponent,
    PaymentTypeFormComponent,
    SaleStatusListComponent,
    SaleStatusFormComponent,
    ClienteListComponent,
    FacturaListComponent,
    EmailDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    NgChartsModule,
    LayoutModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule
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