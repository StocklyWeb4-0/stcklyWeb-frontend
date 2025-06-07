import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  // Eliminado styleUrls para evitar error por archivo scss faltante
  // styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, name: string }
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required]
    });
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close({ id: this.data.id, name: this.form.value.name });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
