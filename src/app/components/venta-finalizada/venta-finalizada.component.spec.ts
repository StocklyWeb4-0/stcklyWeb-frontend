import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { VentaFinalizadaComponent } from './venta-finalizada.component';

describe('VentaFinalizadaComponent', () => {
  let component: VentaFinalizadaComponent;
  let fixture: ComponentFixture<VentaFinalizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [VentaFinalizadaComponent]
    });
    fixture = TestBed.createComponent(VentaFinalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
