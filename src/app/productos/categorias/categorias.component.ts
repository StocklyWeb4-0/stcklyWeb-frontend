import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCategoriesService } from '../../core/services/product-categories.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  // Eliminado styleUrls para evitar error de compilación por archivo scss faltante
  // styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categories: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];
  cargando = false;
  error = false;
  categoriaSeleccionada: any = { id: null, name: '' };

  constructor(
    private categoriesService: ProductCategoriesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargando = true;
    this.error = false;
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        console.log('Categorías recibidas:', data);
        this.categories = data;
        this.cargando = false;
        if (this.categories.length > 0) {
          this.categoriaSeleccionada = { ...this.categories[0] };
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
  
  get showTable(): boolean {
    console.log('Evaluando showTable, categories:', this.categories);
    return this.categories && this.categories.length > 0;
  }

  loadCategories() {
    this.cargando = true;
    this.error = false;
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = true;
        this.cargando = false;
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  guardarCategoria() {
    if (this.categoriaSeleccionada.id) {
      this.categoriesService.updateCategory(this.categoriaSeleccionada.id, this.categoriaSeleccionada).subscribe({
        next: () => {
          this.snackBar.open('Categoría actualizada con éxito', 'Cerrar', { duration: 3000 });
          this.loadCategories();
          this.cancelarEdicion();
        },
        error: (err) => {
          this.snackBar.open('Error al actualizar la categoría', 'Cerrar', { duration: 3000 });
          console.error('Error al actualizar categoría:', err);
        }
      });
    } else {
      this.categoriesService.createCategory(this.categoriaSeleccionada).subscribe({
        next: () => {
          this.snackBar.open('Categoría creada con éxito', 'Cerrar', { duration: 3000 });
          this.loadCategories();
          this.cancelarEdicion();
        },
        error: (err) => {
          this.snackBar.open('Error al crear la categoría', 'Cerrar', { duration: 3000 });
          console.error('Error al crear categoría:', err);
        }
      });
    }
  }

  cancelarEdicion() {
    this.categoriaSeleccionada = { id: null, name: '' };
  }

  seleccionarCategoria(category: any) {
    this.categoriaSeleccionada = { ...category };
  }

  eliminarCategoria(id: number) {
    if (confirm('¿Está seguro de que desea eliminar esta categoría?')) {
      this.categoriesService.deleteCategory(id).subscribe({
        next: () => {
          this.snackBar.open('Categoría eliminada con éxito', 'Cerrar', { duration: 3000 });
          this.loadCategories();
          if (this.categoriaSeleccionada.id === id) {
            this.cancelarEdicion();
          }
        },
        error: (err) => {
          this.snackBar.open('Error al eliminar la categoría', 'Cerrar', { duration: 3000 });
          console.error('Error al eliminar categoría:', err);
        }
      });
    }
  }
}
