import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
  form!: FormGroup;
  usuarioId: string | null = null;
  roles: any[] = [];
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    // Cargar roles dinámicamente
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });

    if (this.usuarioId) {
      this.userService.getUsuario(this.usuarioId).subscribe(usuario => {
        this.form.patchValue({
          nombre: usuario.name,
          correo: usuario.email,
          rol: usuario.roles && usuario.roles.length ? usuario.roles[0].id : null
        });
        // Limpia los campos de contraseña
        this.form.get('password')?.setValue('');
        this.form.get('confirmPassword')?.setValue('');
        this.form.get('password')?.setValidators([]);
        this.form.get('password')?.updateValueAndValidity();
        this.form.get('confirmPassword')?.setValidators([]);
        this.form.get('confirmPassword')?.updateValueAndValidity();
      });
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  guardar() {
    if (this.form.invalid) return;

    const datos = this.form.value;
    delete datos.confirmPassword;

    // Ahora 'rol' es el ID seleccionado
    datos.roles = [datos.rol];
    delete datos.rol;

    datos.name = datos.nombre;
    datos.email = datos.correo;
    delete datos.nombre;
    delete datos.correo;

    if (!datos.password) {
      delete datos.password;
    }

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
