import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente, ClienteService } from '../../core/services/cliente.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'identification', 'email', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
        this.snackBar.open('Error al cargar clientes', 'Cerrar', { duration: 3000 });
      }
    });
  }

  aplicarFiltro(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  editarCliente(cliente: Cliente): void {
    this.router.navigate(['/clientes/editar', cliente.id]);
  }

  eliminarCliente(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Eliminar Cliente',
        message: `¿Estás seguro? Esta acción no se puede deshacer.`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clienteService.deleteCliente(cliente.id!).subscribe({
          next: () => {
            this.snackBar.open('Cliente eliminado con éxito', 'Cerrar', { duration: 3000 });
            this.cargarClientes();
          },
          error: (err) => {
            console.error('Error al eliminar cliente:', err);
            this.snackBar.open('Error al eliminar cliente', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  crearCliente(): void {
    this.router.navigate(['/clientes/crear']);
  }
}
