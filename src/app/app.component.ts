import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service'; // Asegúrate que la ruta es correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StocklyWeb';

  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    // La redirección ya se maneja dentro de authService.logout()
  }
}
