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
        if (response && response.access_token) {
          this.authService.storeToken(response.access_token);
          // Log del token recibido
          console.log('Token JWT recibido:', response.access_token);
          // Decodifica el payload y lo muestra
          try {
            const payload = JSON.parse(atob(response.access_token.split('.')[1]));
            console.log('Payload decodificado del token:', payload);
          } catch (e) {
            console.error('Error al decodificar el token:', e);
          }
          setTimeout(() => {
            const user = this.authService.getCurrentUser();
            console.log('Usuario decodificado tras login:', user);
            if (user && user.roles && user.roles.includes('cajero')) {
              window.location.href = '/cajero';
            } else {
              this.router.navigate(['/dashboard']);
            }
          }, 100);
        }
        const nombreUsuario = correo.split('@')[0];
        this.snackBar.open(`Bienvenido a StocklyWeb ${nombreUsuario}`, 'Cerrar', { duration: 3000 });
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