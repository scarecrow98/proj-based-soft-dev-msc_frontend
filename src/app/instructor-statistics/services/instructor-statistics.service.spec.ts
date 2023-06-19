import { TestBed } from '@angular/core/testing';

import { InstructorStatisticsService } from './instructor-statistics.service';

describe('InstructorStatisticsService', () => {
  let service: InstructorStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
