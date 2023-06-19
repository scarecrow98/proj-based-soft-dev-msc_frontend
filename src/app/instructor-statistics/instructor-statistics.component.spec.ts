import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorStatisticsComponent } from './instructor-statistics.component';

describe('InstructorStatisticsComponent', () => {
  let component: InstructorStatisticsComponent;
  let fixture: ComponentFixture<InstructorStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
