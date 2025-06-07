import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch, faBars, faTachometerAlt, faColumns, faBookOpen, faChartArea, faTable, faAngleDown, faAngleRight, faSignOutAlt, faTimes, faBox, faShoppingCart, faFileAlt, faTruck, faUser, faUsers, faRightFromBracket, faMoneyBillWave, faPeopleGroup, faUserFriends, faCreditCard, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuarioFormComponent } from './usuarios/usuario-form/usuario-form.component';
import { VentaComponent } from './components/venta/venta.component'; // ⬅️ Añadido
import { VentaFinalizadaComponent } from './components/venta-finalizada/venta-finalizada.component'; // ⬅️ Añadido
import { LayoutModule } from './layout/layout.module';
import { ClientesListComponent } from './clientes/clientes-list/clientes-list.component';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    // DashboardComponent,
    // ProductosComponent,  // Eliminado para evitar declaración duplicada
    UsuariosListComponent,
    UsuarioFormComponent,
    ClientesListComponent,
    ClienteFormComponent,
    VentaComponent, // ⬅️ Aquí
    VentaFinalizadaComponent, ConfirmDialogComponent // ⬅️ Aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatCardModule,
    LayoutModule,
    FontAwesomeModule,
    MatDialogModule,
    // CajeroDashboardModule // Eliminado para evitar conflicto con lazy loading
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faSearch, faBars, faTachometerAlt, faColumns, faBookOpen, faChartArea, faTable, faAngleDown, faAngleRight, faSignOutAlt, faTimes,
      faBox, faShoppingCart, faFileAlt, faTruck, faUser, faUsers, faRightFromBracket, faMoneyBillWave,
      faPeopleGroup, faUserFriends, faCreditCard, faClipboardCheck
    );
  }
}
