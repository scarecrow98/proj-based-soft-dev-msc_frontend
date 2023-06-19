import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurvivalStatsComponent } from './survival-stats.component';

describe('SurvivalStatsComponent', () => {
  let component: SurvivalStatsComponent;
  let fixture: ComponentFixture<SurvivalStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurvivalStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurvivalStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
