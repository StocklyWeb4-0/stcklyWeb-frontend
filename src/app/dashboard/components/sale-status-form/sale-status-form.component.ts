import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleStatusService } from 'src/app/core/services/sale-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sale-status-form',
  templateUrl: './sale-status-form.component.html',
  styleUrls: ['./sale-status-form.component.scss']
})
export class SaleStatusFormComponent implements OnInit {
  saleStatusForm!: FormGroup;
  editMode = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private saleStatusService: SaleStatusService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.saleStatusForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.id = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.editMode = !!this.id;
    if (this.editMode && this.id) {
      this.saleStatusService.getSaleStatuses().subscribe(data => {
        const status = data.find((s: any) => s.id === this.id);
        if (status) {
          this.saleStatusForm.patchValue({ name: status.name });
        }
      });
    }
  }

  guardar() {
    if (this.saleStatusForm.invalid) return;
    const data = this.saleStatusForm.value;
    if (this.editMode && this.id) {
      this.saleStatusService.updateSaleStatus(this.id, data).subscribe({
        next: () => {
          this.snackBar.open('Estado de venta actualizado', 'Cerrar', { duration: 2000 });
          this.router.navigate(['/dashboard/estados-venta']);
        },
        error: () => {
          this.snackBar.open('Error al actualizar estado de venta', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.saleStatusService.createSaleStatus(data).subscribe({
        next: () => {
          this.snackBar.open('Estado de venta creado', 'Cerrar', { duration: 2000 });
          this.router.navigate(['/dashboard/estados-venta']);
        },
        error: () => {
          this.snackBar.open('Error al crear estado de venta', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/dashboard/estados-venta']);
  }
} 