import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreditoService } from '../../core/services/credito.service';
import { EstadoPagoEditDialogComponent } from './estado-pago-edit-dialog.component';

@Component({
  selector: 'app-estado-pagos-list',
  templateUrl: './estado-pagos-list.component.html'
})
export class EstadoPagosListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private creditoService: CreditoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarEstadoPagos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarEstadoPagos(): void {
    this.creditoService.getEstadoPagos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar estados de pagos: ' + (err.message || err.statusText);
        this.snackBar.open('Error al cargar estados de pagos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  editarEstado(estado: any): void {
    const dialogRef = this.dialog.open(EstadoPagoEditDialogComponent, {
      width: '400px',
      data: { name: estado.name, description: estado.description }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Solo enviar los campos que fueron modificados (opcionales)
        const updatedData: any = {};
        if (result.name !== undefined && result.name !== estado.name) {
          updatedData.name = result.name;
        }
        if (result.description !== undefined && result.description !== estado.description) {
          updatedData.description = result.description;
        }
        if (Object.keys(updatedData).length > 0) {
          this.creditoService.updateEstadoCredito(estado.id, updatedData).subscribe({
            next: () => {
              this.snackBar.open('Estado actualizado correctamente', 'Cerrar', { duration: 3000 });
              this.cargarEstadoPagos();
            },
            error: (err: any) => {
              this.snackBar.open('Error al actualizar estado', 'Cerrar', { duration: 3000 });
              console.error('Error al actualizar estado:', err);
            }
          });
        }
      }
    });
  }

  eliminarEstado(estado: any): void {
    if (confirm(`¿Está seguro de eliminar el estado "${estado.name}"?`)) {
      this.creditoService.deleteEstadoCredito(estado.id).subscribe({
        next: () => {
          this.snackBar.open('Estado eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.cargarEstadoPagos();
        },
        error: (err: any) => {
          this.snackBar.open('Error al eliminar estado', 'Cerrar', { duration: 3000 });
          console.error('Error al eliminar estado:', err);
        }
      });
    }
  }

  abrirModalCrearEstado(): void {
    const dialogRef = this.dialog.open(EstadoPagoEditDialogComponent, {
      width: '400px',
      data: { isCreateMode: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.creditoService.createEstadoCredito(result).subscribe({
          next: () => {
            this.snackBar.open('Estado creado correctamente', 'Cerrar', { duration: 3000 });
            this.cargarEstadoPagos();
          },
          error: (err: any) => {
            this.snackBar.open('Error al crear estado', 'Cerrar', { duration: 3000 });
            console.error('Error al crear estado:', err);
          }
        });
      }
    });
  }
}
