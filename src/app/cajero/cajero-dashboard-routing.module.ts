import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CajeroDashboardComponent } from './cajero-dashboard.component';

const routes: Routes = [
  { path: '', component: CajeroDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajeroDashboardRoutingModule {} 