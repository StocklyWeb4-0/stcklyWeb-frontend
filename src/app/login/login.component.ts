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
        // Extraer el nombre de usuario del correo para mostrar en la bienvenida
        const nombreUsuario = correo.split('@')[0];
        this.snackBar.open(`Bienvenido a StocklyWeb ${nombreUsuario}`, 'Cerrar', { duration: 3000 });
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
    // Simulación de éxito para cualquier credencial durante la fase de desarrollo
    localStorage.setItem('authToken', 'fake-jwt-token'); // Guardar un token falso
    
    // Extraer el nombre de usuario del correo para mostrar en la bienvenida
    const nombreUsuario = correo.split('@')[0];
    
    // Mostrar mensaje de bienvenida personalizado
    this.snackBar.open(`Bienvenido a StocklyWeb ${nombreUsuario}`, 'Cerrar', { 
      duration: 5000,
      panelClass: ['success-snackbar']
    });
    
    console.log('Redirigiendo al dashboard...');
    // Redirigir al dashboard después de mostrar el mensaje
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 100);
    // --- Fin: Código de simulación ---
  }
}