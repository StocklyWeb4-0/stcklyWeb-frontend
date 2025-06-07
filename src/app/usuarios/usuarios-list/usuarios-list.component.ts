import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'correo', 'rol', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.userService.getUsuarios().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', { duration: 3000 });
      }
    });
  }

  aplicarFiltro(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  editarUsuario(usuario: any): void {
    this.router.navigate(['/usuarios/editar', usuario.id]);
  }

  eliminarUsuario(usuario: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Eliminar Usuario',
        message: `¿Estás seguro? Esta acción no se puede deshacer.`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.eliminarUsuario(usuario.id).subscribe({
          next: () => {
            this.snackBar.open('Usuario eliminado con éxito', 'Cerrar', { duration: 3000 });
            this.cargarUsuarios();
          },
          error: (err) => {
            console.error('Error al eliminar usuario:', err);
            this.snackBar.open('Error al eliminar usuario', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  crearUsuario(): void {
    this.router.navigate(['/usuarios/crear']);
  }
}
