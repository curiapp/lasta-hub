import { TestBed } from '@angular/core/testing';

import { StartNeedAnalysisService } from './start-need-analysis.service';

describe('StartNeedAnalysisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StartNeedAnalysisService = TestBed.get(StartNeedAnalysisService);
    expect(service).toBeTruthy();
  });
});
