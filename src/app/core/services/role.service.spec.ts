import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 