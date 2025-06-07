import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from '../../core/services/producto.service';
import { ProductCategoriesService } from '../../core/services/product-categories.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {
  productoForm!: FormGroup;
  productoId: string = '';
  tituloModal: string = 'Editar Producto';
  cargando = true;
  enviando = false;
  error = false;
  categorias: {id: number, name: string}[] = [];

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private productCategoriesService: ProductCategoriesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarCategorias();
    this.productoId = this.data.id || '';
    this.tituloModal = this.productoId === 'nuevo' ? 'Agregar Producto' : 'Editar Producto';
    if (!this.productoId) {
      this.error = true;
      this.cargando = false;
      this.snackBar.open('ID de producto no válido', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
    if (this.productoId === 'nuevo') {
      this.cargando = false; // No cargar producto, modo creación
    } else {
      this.cargarProducto();
    }
  }

  inicializarFormulario(): void {
    const isCrear = this.productoId === 'nuevo';
    this.productoForm = this.fb.group({
      code: ['', isCrear ? [Validators.required, Validators.minLength(1), Validators.maxLength(255)] : []],
      name: ['', isCrear ? [Validators.required, Validators.minLength(3), Validators.maxLength(255)] : []],
      description: ['', isCrear ? [] : []],
      price: ['', isCrear ? [Validators.required, Validators.min(0.01)] : []],
      priceDiscount: [''],
      stock: ['', isCrear ? [] : [Validators.min(0)]],
      idCategory: ['', isCrear ? Validators.required : []],
    });
  }

  cargarProducto(): void {
    this.cargando = true;
    this.error = false;

    this.productoService.getProducto(this.productoId).subscribe({
      next: (producto) => {
        // Asegurar que el campo code se carga en el formulario
        this.productoForm.patchValue({
          code: producto.code,
          name: producto.name,
          description: producto.description,
          price: producto.price,
          priceDiscount: producto.priceDiscount,
          stock: producto.stock,
          idCategory: producto.idCategory,
        });
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
  }

  cargarCategorias(): void {
    this.productCategoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categorias = categories;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.snackBar.open('Error al cargar las categorías', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
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

      if (this.productoId === 'nuevo') {
        this.productoService.crearProducto(this.productoForm.value).subscribe({
          next: () => {
            this.snackBar.open('Producto creado con éxito', 'Cerrar', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.enviando = false;
            this.dialogRef.close('creado');
          },
          error: (error) => {
            console.error('Error al crear producto:', error);
            this.snackBar.open('Error al crear el producto', 'Cerrar', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
            this.enviando = false;
          }
        });
      } else {
        this.productoService.actualizarProducto(this.productoId, this.productoForm.value).subscribe({
          next: () => {
            this.snackBar.open('Producto actualizado con éxito', 'Cerrar', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.enviando = false;
            this.dialogRef.close('actualizado');
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
      }
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
