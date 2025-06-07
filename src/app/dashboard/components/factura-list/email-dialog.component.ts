import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-dialog',
  template: `
    <h2 mat-dialog-title>Enviar factura por correo</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Correo del cliente</mat-label>
        <input matInput [formControl]="emailControl" type="email" placeholder="cliente@correo.com" required>
        <mat-error *ngIf="emailControl.hasError('required')">
          El correo es obligatorio
        </mat-error>
        <mat-error *ngIf="emailControl.hasError('email') && !emailControl.hasError('required')">
          Ingresa un correo válido
        </mat-error>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="emailControl.invalid" (click)="onSend()">Enviar</button>
    </mat-dialog-actions>
  `
})
export class EmailDialogComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private dialogRef: MatDialogRef<EmailDialogComponent>) {}

  onSend() {
    if (this.emailControl.valid) {
      this.dialogRef.close(this.emailControl.value);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
} 