import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

describe('AuthService integración real', () => {
  let service: AuthService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
  });

  it('debería loguear correctamente con admin@example.com/admin123', (done) => {
    service.login({ correo: 'admin@example.com', contrasena: 'admin123' }).subscribe({
      next: (response) => {
        console.log('Respuesta del login:', response);
        expect(response).toBeTruthy();
        expect(response.access_token).toBeDefined();
        done();
      },
      error: (error) => {
        console.error('Error en el login:', error);
        fail('No se pudo hacer login: ' + JSON.stringify(error));
        done();
      }
    });
  });
}); 