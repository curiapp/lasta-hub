import { TestBed } from '@angular/core/testing';

import { SenateSubmitService } from './senate-submit.service';

describe('SenateSubmitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SenateSubmitService = TestBed.get(SenateSubmitService);
    expect(service).toBeTruthy();
  });
});
