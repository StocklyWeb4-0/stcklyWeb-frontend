import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, ClienteService } from '../../core/services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {
  clienteForm!: FormGroup;
  id?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      name: ['', Validators.required],
      identification: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['']
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.id;

    if (this.isEditMode) {
      this.clienteService.getCliente(this.id!).subscribe(cliente => {
        this.clienteForm.patchValue(cliente);
      });
    }
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) {
      return;
    }

    const clienteData: Cliente = this.clienteForm.value;

    if (this.isEditMode) {
      this.clienteService.updateCliente(this.id!, clienteData).subscribe(() => {
        this.clienteService.notifyClientesChanged();
        this.router.navigate(['/clientes']);
      });
    } else {
      this.clienteService.createCliente(clienteData).subscribe(() => {
        this.clienteService.notifyClientesChanged();
        this.router.navigate(['/clientes']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/clientes']);
  }
}
