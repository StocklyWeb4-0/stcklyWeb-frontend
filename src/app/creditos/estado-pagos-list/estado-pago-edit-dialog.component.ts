import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-estado-pago-edit-dialog',
  template: `
    <h1 mat-dialog-title>{{ isCreateMode ? 'Crear Estado de Crédito' : 'Editar Estado de Crédito' }}</h1>
    <div mat-dialog-content>
      <form [formGroup]="form">
        <mat-form-field appearance="fill" style="width: 100%;">
          <mat-label>Nombre</mat-label>
          <input matInput formControlName="name" [placeholder]="isCreateMode ? 'Nombre (requerido)' : 'Nombre (opcional)'" />
          <mat-error *ngIf="form.controls['name'].hasError('required')">El nombre es obligatorio</mat-error>
        </mat-form-field>
        <mat-form-field appearance="fill" style="width: 100%;">
          <mat-label>Descripción</mat-label>
          <textarea matInput formControlName="description" placeholder="Descripción (opcional)"></textarea>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="form.invalid">Guardar</button>
    </div>
  `
})
export class EstadoPagoEditDialogComponent {
  form: FormGroup;
  isCreateMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EstadoPagoEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isCreateMode = data?.isCreateMode || false;
    this.form = this.fb.group({
      name: [data?.name || '', this.isCreateMode ? Validators.required : []],
      description: [data?.description || '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const updatedData = this.form.value;
      this.dialogRef.close(updatedData);
    }
  }
}
