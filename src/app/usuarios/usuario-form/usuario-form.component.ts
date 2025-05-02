import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
  form!: FormGroup;
  usuarioId: string | null = null;
  roles: string[] = ['administrador', 'cajero'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required]
    });

    if (this.usuarioId) {
      this.userService.getUsuario(this.usuarioId).subscribe(usuario => {
        this.form.patchValue(usuario);
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const datos = this.form.value;

    const peticion = this.usuarioId
      ? this.userService.actualizarUsuario(this.usuarioId, datos)
      : this.userService.crearUsuario(datos);

    peticion.subscribe({
      next: () => {
        this.snackBar.open('Usuario guardado con éxito', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/usuarios']);
      },
      error: err => {
        console.error('Error al guardar usuario', err);
        this.snackBar.open('Error al guardar usuario', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
