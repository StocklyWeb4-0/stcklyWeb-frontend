import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    service = TestBed.inject(ProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 