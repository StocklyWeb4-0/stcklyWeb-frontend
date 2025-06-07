import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { VentaComponent } from './components/venta/venta.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuarioFormComponent } from './usuarios/usuario-form/usuario-form.component';
import { ClientesListComponent } from './clientes/clientes-list/clientes-list.component';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';
import { authGuard } from './core/guards/auth.guard';
import { LayoutDashboardComponent } from './layout/layout-dashboard.component';
import { ListaProductosComponent } from './productos/lista-productos/lista-productos.component';
import { CreditosModule } from './creditos/creditos.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutDashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'productos', loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule) },
      { path: 'venta', component: VentaComponent },
      { path: 'usuarios', component: UsuariosListComponent },
      { path: 'usuarios/crear', component: UsuarioFormComponent },
      { path: 'usuarios/editar/:id', component: UsuarioFormComponent },
      { path: 'clientes', component: ClientesListComponent },
      { path: 'clientes/crear', component: ClienteFormComponent },
      { path: 'clientes/editar/:id', component: ClienteFormComponent },
      { path: 'creditos', loadChildren: () => import('./creditos/creditos.module').then(m => m.CreditosModule) },
      { path: 'cajero', loadChildren: () => import('./cajero/cajero-dashboard.module').then(m => m.CajeroDashboardModule) },
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
