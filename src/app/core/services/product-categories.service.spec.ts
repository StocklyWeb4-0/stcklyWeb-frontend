import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductCategoriesService', () => {
  let service: ProductCategoriesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    service = TestBed.inject(ProductCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 