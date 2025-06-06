import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Reemplaza esta URL con la URL real de tu endpoint de login en el backend
  private apiUrl = `${environment.apiUrl}/auth/login`;
  private readonly TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { correo: string; contrasena: string }): Observable<any> {
    // Ajustar los nombres de los campos a los que espera el backend
    const body = {
      email: credentials.correo,
      password: credentials.contrasena
    };
    return this.http.post<any>(this.apiUrl, body).pipe(
      tap(response => {
        // Asume que el backend devuelve el token en una propiedad 'access_token'
        if (response && response.access_token) {
          this.storeToken(response.access_token);
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

  getCurrentUser(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (e) {
      return null;
    }
  }
}