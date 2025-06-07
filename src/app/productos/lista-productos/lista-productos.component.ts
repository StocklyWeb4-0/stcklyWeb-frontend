import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from '../../core/services/producto.service';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['codigo', 'producto', 'stock', 'precio', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  cargando = true;
  error = false;
  totalProductos = 0;
  filtro = '';
  selectedCategory: number | '' = '';
  categories: {id: number, name: string}[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.loadCategories();
  }

  loadCategories(): void {
    this.productoService.getCategorias().subscribe({
      next: (data) => {
        console.log('Categorías recibidas:', data);
        this.categories = data.map((cat: any) => ({
          id: cat.id,
          name: cat.name
        }));
        console.log('Categorías mapeadas:', this.categories);
      },
      error: (err) => {
        console.error('Error al cargar las categorías:', err);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarProductos(pageIndex?: number, pageSize?: number) {
    this.cargando = true;
    this.error = false;
    console.log('Cargando productos...');

    this.productoService.getProductos(this.selectedCategory === '' ? undefined : this.selectedCategory.toString()).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        this.dataSource.data = response;
        this.totalProductos = response.length || 0;
        this.cargando = false;

        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const searchTerms = JSON.parse(filter);
          const textMatch = Object.keys(data).some(key => {
            const value = data[key];
            return (typeof value === 'string' || typeof value === 'number') && value.toString().toLowerCase().includes(searchTerms.text.toLowerCase());
          });
          return textMatch;
        };

        this.aplicarFiltroInterno();
      },
      error: (err) => {
        this.error = true;
        this.cargando = false;
        console.error('Error al cargar productos:', err);
      }
    });
  }

  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.filtro = valorFiltro.trim().toLowerCase();
    this.aplicarFiltroInterno();
  }

  aplicarFiltroInterno() {
    const filterValue = JSON.stringify({ text: this.filtro, category: this.selectedCategory });
    console.log('Aplicando filtro:', filterValue);
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCategoryChange() {
    this.cargarProductos();
    this.aplicarFiltroInterno();
  }

  editarProducto(id: string) {
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '600px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'actualizado' || result === 'creado') {
        this.cargarProductos();
      }
    });
  }

  eliminarProducto(id: string) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      this.productoService.eliminarProducto(Number(id)).subscribe({
        next: () => {
          this.cargarProductos();
          this.snackBar.open('Producto eliminado con éxito', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (err) => {
          this.snackBar.open('Error al eliminar el producto', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error al eliminar producto:', err);
        }
      });
    }
  }
}
