import { Component, OnInit } from '@angular/core';
import { SaleStatusService } from 'src/app/core/services/sale-status.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-sale-status-list',
  templateUrl: './sale-status-list.component.html',
  styleUrls: ['./sale-status-list.component.scss']
})
export class SaleStatusListComponent implements OnInit {
  saleStatuses: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'acciones'];
  loading = false;

  constructor(
    private saleStatusService: SaleStatusService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarEstadosVenta();
  }

  cargarEstadosVenta() {
    this.loading = true;
    this.saleStatusService.getSaleStatuses().subscribe({
      next: (data) => {
        this.saleStatuses = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar estados de venta', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  crearEstadoVenta() {
    this.router.navigate(['dashboard/estados-venta/crear']);
  }

  editarEstadoVenta(id: number) {
    this.router.navigate(['dashboard/estados-venta/editar', id]);
  }

  eliminarEstadoVenta(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Estado de Venta',
        message: '¿Seguro que deseas eliminar este estado de venta?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saleStatusService.deleteSaleStatus(id).subscribe({
          next: () => {
            this.snackBar.open('Estado de venta eliminado', 'Cerrar', { duration: 2000 });
            this.cargarEstadosVenta();
          },
          error: () => {
            this.snackBar.open('Error al eliminar estado de venta', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }
} 