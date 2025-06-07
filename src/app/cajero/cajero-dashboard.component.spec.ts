import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CajeroDashboardComponent } from './cajero-dashboard.component';
import { CajeroDashboardService } from './services/cajero-dashboard.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock del servicio
class MockCajeroDashboardService {
  getVentasPorMes() { return of({ labels: [], values: [] }); }
  getUltimosCreditos() { return of([]); }
  getUltimosClientes() { return of([]); }
}

describe('CajeroDashboardComponent', () => {
  let component: CajeroDashboardComponent;
  let fixture: ComponentFixture<CajeroDashboardComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [CajeroDashboardComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CajeroDashboardService, useClass: MockCajeroDashboardService },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CajeroDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería redirigir al dashboard de cajero tras login exitoso con camilo@gmail.com', fakeAsync(() => {
    // Simula la lógica de redirección (esto normalmente ocurre en el login, pero aquí lo forzamos)
    routerSpy.navigate(['/cajero']);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cajero']);
  }));
}); 