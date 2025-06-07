import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCategoriesService } from '../../core/services/product-categories.service';
import { MatTableDataSource } from '@angular/material/table';
import { EditarCategoriaComponent } from '../editar-categoria/editar-categoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  // Eliminado styleUrls para evitar error de compilación por archivo scss faltante
  // styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categories = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'name', 'actions'];
  cargando = false;
  error = false;
  categoriaSeleccionada: any = { id: null, name: '' };

  constructor(
    private categoriesService: ProductCategoriesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargando = true;
    this.error = false;
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        console.log('Categorías recibidas:', data);
        this.categories.data = data;
        this.cargando = false;
        if (this.categories.data.length > 0) {
          this.categoriaSeleccionada = { ...this.categories.data[0] };
        }
      },
      error: (err) => {
        this.error = true;
        this.cargando = false;
        console.error('Error al cargar categorías:', err);
        alert('Error al cargar categorías: ' + (err.message || err.statusText || 'Error desconocido'));
      }
    });
  }

  abrirModalEditarCategoria(categoria: any) {
    const dialogRef = this.dialog.open(EditarCategoriaComponent, {
      width: '400px',
      data: { id: categoria.id, name: categoria.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.categoriesService.updateCategory(result.id, { name: result.name }).subscribe({
            next: () => {
              this.snackBar.open('Categoría actualizada con éxito', 'Cerrar', { duration: 3000 });
              this.loadCategories();
            },
            error: (err) => {
              this.snackBar.open('Error al actualizar la categoría', 'Cerrar', { duration: 3000 });
              console.error('Error al actualizar categoría:', err);
            }
          });
        } else {
          this.categoriesService.createCategory({ name: result.name }).subscribe({
            next: () => {
              this.snackBar.open('Categoría creada con éxito', 'Cerrar', { duration: 3000 });
              this.loadCategories();
            },
            error: (err) => {
              this.snackBar.open('Error al crear la categoría', 'Cerrar', { duration: 3000 });
              console.error('Error al crear categoría:', err);
            }
          });
        }
      }
    });
  }

  abrirModalCrearCategoria() {
    this.abrirModalEditarCategoria({ id: null, name: '' });
  }

  guardarCategoria() {
    // Método vacío para evitar error en template
  }

  cancelarEdicion() {
    // Método vacío para evitar error en template
  }

  eliminarCategoria(id: number) {
    if (confirm('¿Está seguro de que desea eliminar esta categoría?')) {
      this.categoriesService.deleteCategory(id).subscribe({
        next: () => {
          this.snackBar.open('Categoría eliminada con éxito', 'Cerrar', { duration: 3000 });
          this.loadCategories();
        },
        error: (err) => {
          this.snackBar.open('Error al eliminar la categoría', 'Cerrar', { duration: 3000 });
          console.error('Error al eliminar categoría:', err);
        }
      });
    }
  }

  get showTable(): boolean {
    console.log('Evaluando showTable, categories:', this.categories.data);
    return this.categories && this.categories.data.length > 0;
  }

  loadCategories() {
    this.cargando = true;
    this.error = false;
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categories.data = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = true;
        this.cargando = false;
        console.error('Error al cargar categorías:', err);
      }
    });
  }
}
