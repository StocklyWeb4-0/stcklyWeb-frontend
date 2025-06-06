import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, MatSnackBarModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería iniciar sesión y redirigir al dashboard como admin', fakeAsync(() => {
    // Simula valores del formulario
    component.loginForm.setValue({ correo: 'admin@example.com', contrasena: 'admin123' });
    // Simula respuesta exitosa del backend
    authServiceSpy.login.and.returnValue(of({ access_token: 'fake.jwt.token' }));

    component.onSubmit();
    tick();

    expect(authServiceSpy.login).toHaveBeenCalledWith({ correo: 'admin@example.com', contrasena: 'admin123' });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));
}); 