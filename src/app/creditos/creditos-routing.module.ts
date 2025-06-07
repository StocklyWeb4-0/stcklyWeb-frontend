import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditosListComponent } from './creditos-list/creditos-list.component';
import { EstadoPagosListComponent } from './estado-pagos-list/estado-pagos-list.component';

const routes: Routes = [
  { path: '', component: CreditosListComponent },
  { path: 'estado-pagos', component: EstadoPagosListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditosRoutingModule {}
