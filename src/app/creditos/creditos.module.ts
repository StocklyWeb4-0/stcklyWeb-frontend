import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditosListComponent } from './creditos-list/creditos-list.component';
import { EstadoPagosListComponent } from './estado-pagos-list/estado-pagos-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CreditosRoutingModule } from './creditos-routing.module';

import { EstadoPagoEditDialogComponent } from './estado-pagos-list/estado-pago-edit-dialog.component';

@NgModule({
  declarations: [CreditosListComponent, EstadoPagosListComponent, EstadoPagoEditDialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    CreditosRoutingModule
  ],
  exports: [CreditosListComponent]
})
export class CreditosModule {}
