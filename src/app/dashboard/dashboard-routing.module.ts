import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardGuard } from './guards/dashboard.guard';
import { PaymentTypeListComponent } from './components/payment-type-list/payment-type-list.component';
import { PaymentTypeFormComponent } from './components/payment-type-form/payment-type-form.component';
import { SaleStatusListComponent } from './components/sale-status-list/sale-status-list.component';
import { SaleStatusFormComponent } from './components/sale-status-form/sale-status-form.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { FacturaListComponent } from './components/factura-list/factura-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    // children: [ ... ] // Aquí se agregarán rutas hijas para cards, charts, tabla, etc.
  },
  { path: 'tipos-pago', component: PaymentTypeListComponent },
  { path: 'tipos-pago/crear', component: PaymentTypeFormComponent },
  { path: 'tipos-pago/editar/:id', component: PaymentTypeFormComponent },
  { path: 'estados-venta', component: SaleStatusListComponent },
  { path: 'estados-venta/crear', component: SaleStatusFormComponent },
  { path: 'estados-venta/editar/:id', component: SaleStatusFormComponent },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'facturas', component: FacturaListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {} 