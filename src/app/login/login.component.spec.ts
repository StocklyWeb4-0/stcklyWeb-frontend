import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'getCurrentUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, MatSnackBarModule, HttpClientTestingModule],
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

  it('debería iniciar sesión y redirigir al dashboard de cajero si el usuario es cajero', fakeAsync(() => {
    component.loginForm.setValue({ correo: 'cajero@example.com', contrasena: 'cajero123' });
    authServiceSpy.login.and.returnValue(of({ access_token: 'fake.jwt.token' }));
    // Simula el payload del token decodificado con rol cajero
    spyOn(authServiceSpy, 'getCurrentUser').and.returnValue({ roles: ['cajero'] });

    component.onSubmit();
    tick();

    expect(authServiceSpy.login).toHaveBeenCalledWith({ correo: 'cajero@example.com', contrasena: 'cajero123' });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cajero']);
  }));

  it('debería iniciar sesión y redirigir al dashboard de cajero con el usuario camilo@gmail.com', fakeAsync(() => {
    component.loginForm.setValue({ correo: 'camilo@gmail.com', contrasena: '12345678' });
    authServiceSpy.login.and.returnValue(of({ access_token: 'fake.jwt.token' }));
    spyOn(authServiceSpy, 'getCurrentUser').and.returnValue({ email: 'camilo@gmail.com', roles: ['cajero'] });

    component.onSubmit();
    tick(300); // Simula el delay

    expect(authServiceSpy.login).toHaveBeenCalledWith({ correo: 'camilo@gmail.com', contrasena: '12345678' });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cajero']);
  }));
}); 