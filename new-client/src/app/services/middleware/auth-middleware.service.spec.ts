import { TestBed } from '@angular/core/testing';

import { AuthMiddlewareService } from './auth-middleware.service';

describe('AuthMiddlewareService', () => {
  let service: AuthMiddlewareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthMiddlewareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
