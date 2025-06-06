import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../core/services/auth.service'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      console.log('Formulario inválido', this.loginForm.value);
      return;
    }

    const { correo, contrasena } = this.loginForm.value;
    console.log('Enviando login', { correo, contrasena });

    this.authService.login({ correo, contrasena }).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        const nombreUsuario = correo.split('@')[0];
        this.snackBar.open(`Bienvenido a StocklyWeb ${nombreUsuario}`, 'Cerrar', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error de inicio de sesión:', error);
        this.snackBar.open(error.message || 'Error en el inicio de sesión. Verifique sus credenciales.', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}