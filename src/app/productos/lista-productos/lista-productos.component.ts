import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService, Producto } from '../../core/services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nombre', 'categoria', 'marca', 'unidadMedida', 'precioUnitario', 'stock', 'acciones'];
  dataSource = new MatTableDataSource<Producto>([]);
  cargando = true;
  error = false;
  totalProductos = 0;
  filtro = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarProductos() {
    this.cargando = true;
    this.error = false;

    // Simulación de datos para tienda de construcción
    setTimeout(() => {
      const productosSimulados: Producto[] = [ // Ahora usamos la interfaz Producto actualizada
        { id: '1', codigo: 'CEM001', nombre: 'Cemento Portland Gris', categoria: 'Materiales Básicos', marca: 'Argos', unidadMedida: 'Bulto 50kg', precioUnitario: 32.300, stock: 150, descripcion: 'Cemento gris para construcción general' },
        { id: '2', codigo: 'VAR003', nombre: 'Varilla Corrugada 1/2"', categoria: 'Acero', marca: 'Gerdau', unidadMedida: 'Unidad 6m', precioUnitario: 35.400, stock: 300, descripcion: 'Varilla de acero para refuerzo estructural' },
        { id: '3', codigo: 'LAD010', nombre: 'Ladrillo Común Prensado', categoria: 'Mampostería', marca: 'Santafé', unidadMedida: 'Unidad', precioUnitario: 0.80, stock: 5000, descripcion: 'Ladrillo estándar para muros' },
        { id: '4', codigo: 'PIN005', nombre: 'Pintura Blanca Vinilo Tipo 1', categoria: 'Acabados', marca: 'Pintuco', unidadMedida: 'Galón', precioUnitario: 45.00, stock: 80, descripcion: 'Pintura lavable para interiores y exteriores' },
        { id: '5', codigo: 'TUB002', nombre: 'Tubo PVC Sanitario 4"', categoria: 'Plomería', marca: 'Pavco', unidadMedida: 'Unidad 3m', precioUnitario: 15.20, stock: 200, descripcion: 'Tubo para desagües sanitarios' },
        { id: '6', codigo: 'HER015', nombre: 'Taladro Percutor 1/2"', categoria: 'Herramientas', marca: 'Dewalt', unidadMedida: 'Unidad', precioUnitario: 350.00, stock: 25, descripcion: 'Taladro eléctrico con función de percusión' }
      ];

      this.dataSource.data = productosSimulados;
      this.totalProductos = productosSimulados.length;
      this.cargando = false;

      /* Código para cuando se implemente el backend
      this.productoService.getProductos(
        this.paginator?.pageIndex || 0,
        this.paginator?.pageSize || 10,
        this.filtro
      ).subscribe({
        next: (response) => {
          this.dataSource.data = response.productos;
          this.totalProductos = response.total;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar productos:', error);
          this.error = true;
          this.cargando = false;
          this.snackBar.open('Error al cargar los productos', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
      */
    }, 800);
  }

  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.filtro = valorFiltro.trim().toLowerCase();
    // Ajustar el predicado de filtro para buscar en los nuevos campos
    this.dataSource.filterPredicate = (data: Producto, filter: string) => { // Usar la interfaz Producto
      const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
        // Asegurarse de que solo se concatenan strings o números para el filtro
        const value = (data as {[key: string]: any})[key];
        return currentTerm + (typeof value === 'string' || typeof value === 'number' ? value : '') + '◬';
      }, '').toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
    this.dataSource.filter = this.filtro;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    // Cuando se implemente el backend, descomentar esto y comentar lo anterior
    // this.cargarProductos();
  }

  editarProducto(id: string) {
    this.router.navigate(['/productos/editar', id]);
  }

  eliminarProducto(id: string) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      // Simulación de eliminación mientras se implementa el backend
      this.dataSource.data = this.dataSource.data.filter(producto => producto.id !== id);
      this.snackBar.open('Producto eliminado con éxito', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      /* Código para cuando se implemente el backend
      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          this.snackBar.open('Producto eliminado con éxito', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.cargarProductos();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          this.snackBar.open('Error al eliminar el producto', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
      */
    }
  }

  crearProducto() {
    this.router.navigate(['/productos/crear']);
  }

  onPageChange(event: any) {
    // Cuando se implemente el backend, descomentar esto
    // this.cargarProductos();
  }
}