import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {
  clientes: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'identification', 'phone', 'address', 'acciones'];
  loading = false;
  showForm = false;
  editMode = false;
  clienteForm!: FormGroup;
  editingClienteId: number | null = null;

  constructor(
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
    this.initForm();
  }

  initForm() {
    this.clienteForm = this.fb.group({
      name: ['', Validators.required],
      identification: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      address: ['', Validators.required]
    });
  }

  cargarClientes() {
    this.loading = true;
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar clientes', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  mostrarFormularioCrear() {
    this.showForm = true;
    this.editMode = false;
    this.editingClienteId = null;
    this.clienteForm.reset();
  }

  mostrarFormularioEditar(cliente: any) {
    this.showForm = true;
    this.editMode = true;
    this.editingClienteId = cliente.id;
    this.clienteForm.patchValue({
      name: cliente.name,
      identification: cliente.identification,
      phone: cliente.phone,
      email: cliente.email,
      address: cliente.address
    });
  }

  cancelarFormulario() {
    this.showForm = false;
    this.editMode = false;
    this.editingClienteId = null;
    this.clienteForm.reset();
  }

  guardarCliente() {
    if (this.clienteForm.invalid) return;
    const data = this.clienteForm.value;
    if (this.editMode && this.editingClienteId) {
      this.clienteService.updateCliente(this.editingClienteId, data).subscribe({
        next: () => {
          this.snackBar.open('Cliente actualizado', 'Cerrar', { duration: 2000 });
          this.cargarClientes();
          this.cancelarFormulario();
        },
        error: () => {
          this.snackBar.open('Error al actualizar cliente', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.clienteService.createCliente(data).subscribe({
        next: () => {
          this.snackBar.open('Cliente creado', 'Cerrar', { duration: 2000 });
          this.cargarClientes();
          this.cancelarFormulario();
        },
        error: () => {
          this.snackBar.open('Error al crear cliente', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  eliminarCliente(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Cliente',
        message: '¿Seguro que deseas eliminar este cliente?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clienteService.deleteCliente(id).subscribe({
          next: () => {
            this.snackBar.open('Cliente eliminado', 'Cerrar', { duration: 2000 });
            this.cargarClientes();
          },
          error: () => {
            this.snackBar.open('Error al eliminar cliente', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }
} 