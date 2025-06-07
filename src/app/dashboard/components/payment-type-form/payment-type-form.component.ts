import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentTypeService } from 'src/app/core/services/payment-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-type-form',
  templateUrl: './payment-type-form.component.html',
  styleUrls: ['./payment-type-form.component.scss']
})
export class PaymentTypeFormComponent implements OnInit {
  paymentTypeForm!: FormGroup;
  editMode = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private paymentTypeService: PaymentTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.paymentTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.id = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.editMode = !!this.id;
    if (this.editMode && this.id) {
      this.paymentTypeService.getPaymentTypes().subscribe(data => {
        const tipo = data.find((t: any) => t.id === this.id);
        if (tipo) {
          this.paymentTypeForm.patchValue({ name: tipo.name });
        }
      });
    }
  }

  guardar() {
    if (this.paymentTypeForm.invalid) return;
    const data = this.paymentTypeForm.value;
    if (this.editMode && this.id) {
      this.paymentTypeService.updatePaymentType(this.id, data).subscribe({
        next: () => {
          this.snackBar.open('Tipo de pago actualizado', 'Cerrar', { duration: 2000 });
          this.router.navigate(['/dashboard/tipos-pago']);
        },
        error: () => {
          this.snackBar.open('Error al actualizar tipo de pago', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.paymentTypeService.createPaymentType(data).subscribe({
        next: () => {
          this.snackBar.open('Tipo de pago creado', 'Cerrar', { duration: 2000 });
          this.router.navigate(['/dashboard/tipos-pago']);
        },
        error: () => {
          this.snackBar.open('Error al crear tipo de pago', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/dashboard/tipos-pago']);
  }
} 