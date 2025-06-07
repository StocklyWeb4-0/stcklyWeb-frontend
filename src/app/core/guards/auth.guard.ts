import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate que la ruta es correcta

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let token = authService.getToken();
  console.log('Token en authGuard:', token);

  if (token) {
    return true;
  } else {
    // Espera breve y vuelve a intentar para evitar problemas de sincronización tras login
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        token = authService.getToken();
        console.log('Reintento de token en authGuard:', token);
        if (token) {
          resolve(true);
        } else {
          router.navigate(['/login']);
          resolve(false);
        }
      }, 150);
    });
  }
};
