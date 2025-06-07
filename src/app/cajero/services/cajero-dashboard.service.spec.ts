import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CajeroDashboardService', () => {
  let service: CajeroDashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    service = TestBed.inject(CajeroDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 