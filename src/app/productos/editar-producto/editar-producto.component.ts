import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService, Producto } from '../../core/services/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {
  productoForm!: FormGroup;
  productoId: string = '';
  cargando = true;
  enviando = false;
  error = false;
  categorias: string[] = ['Electrónicos', 'Accesorios', 'Audio', 'Computadoras', 'Celulares', 'Otros'];

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.productoId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.productoId) {
      this.error = true;
      this.cargando = false;
      this.snackBar.open('ID de producto no válido', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
    this.cargarProducto();
  }

  inicializarFormulario(): void {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      categoria: ['', Validators.required],
      imagen: [''] // Opcional
    });
  }

  cargarProducto(): void {
    this.cargando = true;
    this.error = false;

    
  
      /* Código para cuando se implemente el backend
      this.productoService.getProducto(this.productoId).subscribe({
        next: (producto) => {
          this.productoForm.patchValue(producto);
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar producto:', error);
          this.error = true;
          this.cargando = false;
          this.snackBar.open('Error al cargar el producto', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
      */

  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.productoForm.controls).forEach(key => {
        const control = this.productoForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.enviando = true;

    // Simulación de actualización mientras se implementa el backend
    setTimeout(() => {
      this.snackBar.open('Producto actualizado con éxito', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.enviando = false;
      this.router.navigate(['/productos']);

      /* Código para cuando se implemente el backend
      this.productoService.actualizarProducto(this.productoId, this.productoForm.value).subscribe({
        next: () => {
          this.snackBar.open('Producto actualizado con éxito', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.enviando = false;
          this.router.navigate(['/productos']);
        },
        error: (error) => {
          console.error('Error al actualizar producto:', error);
          this.snackBar.open('Error al actualizar el producto', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.enviando = false;
        }
      });
      */
    }, 800);
  }

  cancelar(): void {
    this.router.navigate(['/productos']);
  }

  // Getters para acceder fácilmente a los form controls en el template
  get nombreControl() { return this.productoForm.get('nombre'); }
  get descripcionControl() { return this.productoForm.get('descripcion'); }
  get precioControl() { return this.productoForm.get('precio'); }
  get stockControl() { return this.productoForm.get('stock'); }
  get categoriaControl() { return this.productoForm.get('categoria'); }
}