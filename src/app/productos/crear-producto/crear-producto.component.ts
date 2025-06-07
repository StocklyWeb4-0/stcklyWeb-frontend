import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from '../../core/services/producto.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productoForm!: FormGroup;
  error = false;
  tituloModal: string = 'Agregar Producto';
  cargando = true;
  enviando = false;
  categorias: {id: number, name: string}[] = [];
  productoId: string = '';

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CrearProductoComponent>
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.productoService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
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
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  // Getters para acceder fácilmente a los form controls en el template
  get nombreControl() { return this.productoForm.get('name'); }
  get descripcionControl() { return this.productoForm.get('description'); }
  get precioControl() { return this.productoForm.get('price'); }
  get stockControl() { return this.productoForm.get('stock'); }
  get categoriaControl() { return this.productoForm.get('idCategory'); }

}
