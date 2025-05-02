import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Reemplaza esta URL con la URL real de tu endpoint de login en el backend
  private apiUrl = 'http://localhost:3000/api/auth/login'; // Ejemplo de URL
  private readonly TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { correo: string; contrasena: string }): Observable<any> {
    // Asegúrate de que el backend espera 'correo' y 'contrasena'
    // o ajusta los nombres de las propiedades según sea necesario.
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        // Asume que el backend devuelve el token en una propiedad 'token'
        if (response && response.token) {
          this.storeToken(response.token);
        }
      })
    );
  }

  logout(): void {
    this.removeToken();
    // Redirige al login después de cerrar sesión
    this.router.navigate(['/login']);
  }

  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    // Verifica si existe un token
    // Podrías añadir validación de expiración del token aquí si es necesario
    return !!this.getToken();
  }
}