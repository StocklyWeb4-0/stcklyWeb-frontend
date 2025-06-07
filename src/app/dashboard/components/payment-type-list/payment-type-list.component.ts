import { Component, OnInit } from '@angular/core';
import { PaymentTypeService } from 'src/app/core/services/payment-type.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-payment-type-list',
  templateUrl: './payment-type-list.component.html',
  styleUrls: ['./payment-type-list.component.scss']
})
export class PaymentTypeListComponent implements OnInit {
  paymentTypes: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'acciones'];
  loading = false;

  constructor(
    private paymentTypeService: PaymentTypeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarTiposPago();
  }

  cargarTiposPago() {
    this.loading = true;
    this.paymentTypeService.getPaymentTypes().subscribe({
      next: (data) => {
        this.paymentTypes = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar tipos de pago', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  crearTipoPago() {
    this.router.navigate(['dashboard/tipos-pago/crear']);
  }

  editarTipoPago(id: number) {
    this.router.navigate(['dashboard/tipos-pago/editar', id]);
  }

  eliminarTipoPago(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Tipo de Pago',
        message: '¿Seguro que deseas eliminar este tipo de pago?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paymentTypeService.deletePaymentType(id).subscribe({
          next: () => {
            this.snackBar.open('Tipo de pago eliminado', 'Cerrar', { duration: 2000 });
            this.cargarTiposPago();
          },
          error: () => {
            this.snackBar.open('Error al eliminar tipo de pago', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }
} 