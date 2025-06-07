import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProductoService } from 'src/app/core/services/producto.service';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { PaymentTypeService } from 'src/app/core/services/payment-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SaleStatusService } from 'src/app/core/services/sale-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  ventaForm!: FormGroup;
  productos: any[] = [];
  clientes: any[] = [];
  paymentTypes: any[] = [];
  resumenVenta: any = null;
  enviando = false;
  saleStatuses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private paymentTypeService: PaymentTypeService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private saleStatusService: SaleStatusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ventaForm = this.fb.group({
      productos: this.fb.array([]),
      paymentType: [null, Validators.required],
      customerId: [null],
      customerEmail: [''],
      totalPayments: [1],
      saleStatusId: [null]
    });
    this.cargarProductos();
    this.cargarClientes();
    this.cargarTiposPago();
    this.cargarEstadosVenta();
    this.agregarProducto();
  }

  get productosFormArray() {
    return this.ventaForm.get('productos') as FormArray;
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data.content || data;
      },
      error: (err) => {
        this.snackBar.open('Error al cargar productos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe((data: any) => {
      this.clientes = data;
    });
  }

  cargarTiposPago() {
    this.paymentTypeService.getPaymentTypes().subscribe((data: any) => {
      this.paymentTypes = data;
    });
  }

  cargarEstadosVenta() {
    this.saleStatusService.getSaleStatuses().subscribe((data: any) => {
      this.saleStatuses = data;
    });
  }

  agregarProducto() {
    this.productosFormArray.push(this.fb.group({
      code: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    }));
  }

  eliminarProducto(index: number) {
    this.productosFormArray.removeAt(index);
  }

  calcularTotal(): number {
    let total = 0;
    for (let i = 0; i < this.productosFormArray.length; i++) {
      const prod = this.productosFormArray.at(i).value;
      const producto = this.productos.find(p => p.code === prod.code);
      if (producto) {
        total += (producto.price || 0) * (prod.quantity || 1);
      }
    }
    return total;
  }

  onSubmit() {
    if (this.ventaForm.invalid) {
      this.snackBar.open('Completa todos los campos obligatorios', 'Cerrar', { duration: 3000 });
      return;
    }
    const formValue = this.ventaForm.value;
    const tipoPago = this.paymentTypes.find(pt => pt.id === formValue.paymentType);
    // Validación: si es crédito, debe haber cliente registrado
    if (tipoPago && tipoPago.name && tipoPago.name.toLowerCase() === 'credito') {
      if (!formValue.customerId) {
        this.snackBar.open('Para ventas a crédito, el cliente debe estar registrado.', 'Cerrar', { duration: 4000, panelClass: ['error-snackbar'] });
        this.router.navigate(['/dashboard/clientes']);
        return;
      }
      if (!formValue.totalPayments || formValue.totalPayments < 1) {
        this.snackBar.open('Debes indicar el número de cuotas para crédito.', 'Cerrar', { duration: 4000, panelClass: ['error-snackbar'] });
        return;
      }
    } else {
      // Si no es crédito, no enviar totalPayments
      formValue.totalPayments = undefined;
    }
    // Si no hay cliente seleccionado, usar el email
    if (!formValue.customerId) {
      formValue.customerId = undefined;
    }
    if (!formValue.customerEmail) {
      formValue.customerEmail = undefined;
    }
    // Formato para el backend
    const payload: any = {
      products: formValue.productos,
      paymentType: formValue.paymentType,
      saleStatusId: formValue.saleStatusId,
      customerId: formValue.customerId,
      customerEmail: formValue.customerEmail,
      totalPayments: formValue.totalPayments
    };
    this.enviando = true;
    this.http.post(`${environment.apiUrl}/sale`, payload).subscribe({
      next: (res) => {
        this.snackBar.open('Venta registrada correctamente', 'Cerrar', { duration: 3000, panelClass: ['success-snackbar'] });
        this.resumenVenta = res;
        this.ventaForm.reset();
        this.productosFormArray.clear();
        this.agregarProducto();
        this.enviando = false;
      },
      error: (err) => {
        this.snackBar.open('Error al registrar la venta', 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] });
        this.enviando = false;
      }
    });
  }

  mostrarErrorCuotas(): boolean {
    const totalPaymentsCtrl = this.ventaForm.get('totalPayments');
    const paymentTypeCtrl = this.ventaForm.get('paymentType');
    if (!totalPaymentsCtrl || !paymentTypeCtrl) return false;
    const paymentTypeId = paymentTypeCtrl.value;
    const tipoPago = this.paymentTypes.find(pt => pt.id === paymentTypeId);
    return !!(
      totalPaymentsCtrl.invalid &&
      tipoPago &&
      tipoPago.name &&
      tipoPago.name.toLowerCase() === 'credito'
    );
  }

  irATiposPago() {
    this.router.navigate(['/dashboard/tipos-pago']);
  }

  irAEstadosVenta() {
    this.router.navigate(['/dashboard/estados-venta']);
  }
}
