import { TestBed } from '@angular/core/testing';

import { SurvivalAnalysisService } from './survival-analysis.service';

describe('SurvivalAnalysisService', () => {
  let service: SurvivalAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurvivalAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
