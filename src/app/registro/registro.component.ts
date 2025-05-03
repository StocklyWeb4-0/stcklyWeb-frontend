import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  hideClaveEmpresa = true;
  mostrarCampoEmpresa = false;
  private readonly CLAVE_EMPRESA = 'itp';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required],
      rol: ['usuario', Validators.required],
      claveEmpresa: [{ value: '', disabled: true }]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('contrasena')?.value;
    const confirmPassword = control.get('confirmarContrasena')?.value;

    if (password !== confirmPassword) {
      control.get('confirmarContrasena')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  onRolChange(): void {
    const rolControl = this.registroForm.get('rol');
    const claveEmpresaControl = this.registroForm.get('claveEmpresa');

    if (rolControl?.value === 'administrador') {
      this.mostrarCampoEmpresa = true;
      claveEmpresaControl?.enable();
      claveEmpresaControl?.setValidators([Validators.required, this.claveEmpresaValidator.bind(this)]);
    } else {
      this.mostrarCampoEmpresa = false;
      claveEmpresaControl?.disable();
      claveEmpresaControl?.clearValidators();
    }
    claveEmpresaControl?.updateValueAndValidity();
  }

  claveEmpresaValidator(control: AbstractControl): ValidationErrors | null {
    return control.value === this.CLAVE_EMPRESA ? null : { claveIncorrecta: true };
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  toggleClaveEmpresaVisibility(): void {
    this.hideClaveEmpresa = !this.hideClaveEmpresa;
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      return;
    }

    const { nombre, correo, contrasena, rol } = this.registroForm.value;
    
    // Aquí iría la llamada al servicio para registrar al usuario
    // Como es una simulación, simplemente mostraremos un mensaje de éxito
    
    // Simulación de registro exitoso
    this.snackBar.open('Registro exitoso. Ahora puedes iniciar sesión.', 'Cerrar', { duration: 3000 });
    this.router.navigate(['/login']);
    
    /* 
    // Código para cuando se implemente el backend
    this.userService.crearUsuario({
      nombre,
      correo,
      contrasena,
      rol
    }).subscribe({
      next: () => {
        this.snackBar.open('Registro exitoso. Ahora puedes iniciar sesión.', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        this.snackBar.open('Error en el registro. Por favor, inténtalo de nuevo.', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
    */
  }
}