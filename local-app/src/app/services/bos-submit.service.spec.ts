import { TestBed } from '@angular/core/testing';

import { BosSubmitService } from './bos-submit.service';

describe('BosSubmitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BosSubmitService = TestBed.get(BosSubmitService);
    expect(service).toBeTruthy();
  });
});
