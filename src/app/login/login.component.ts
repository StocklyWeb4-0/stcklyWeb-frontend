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
      return; // No hacer nada si el formulario es inválido
    }

    const { correo, contrasena } = this.loginForm.value;

    // Llama al servicio de autenticación
    // NOTA: Asumiendo que authService.login devuelve un Observable
    // y que en caso de éxito emite un objeto con una propiedad 'token'
    // y en caso de error, maneja el error apropiadamente.
    // Como el backend no está conectado, simularemos una respuesta.

    /* // Se comenta la llamada real al backend mientras se usa la simulación
    this.authService.login(correo, contrasena).subscribe({
      next: (response) => {
        // Simulación de éxito: Suponiendo que el servicio devuelve un token
        // localStorage.setItem('authToken', response.token); // Descomentar cuando el servicio real esté listo
        this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/dashboard']); // Redirige al dashboard o a la página principal
      },
      error: (error) => {
        // Manejo de errores del servicio
        console.error('Error de inicio de sesión:', error);
        this.snackBar.open(error.message || 'Error en el inicio de sesión. Verifique sus credenciales.', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar'] // Clase CSS opcional para estilizar el snackbar de error
        });
      }
    });
    */

    // --- Inicio: Código de simulación (Eliminar cuando el backend esté listo) ---
    // /* // Se descomenta el bloque de simulación
    if (correo === 'admin@stockly.com' && contrasena === 'password123') {
      // Simulación de éxito
      localStorage.setItem('authToken', 'fake-jwt-token'); // Guardar un token falso
      this.snackBar.open('Inicio de sesión exitoso (simulado)', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/dashboard']); // O la ruta a la que quieras redirigir
    } else {
      // Simulación de error
      this.snackBar.open('Credenciales inválidas (simulado)', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    }
    // */ // Se descomenta el bloque de simulación
    // --- Fin: Código de simulación ---
  }
}