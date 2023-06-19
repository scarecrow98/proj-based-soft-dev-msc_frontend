import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskScoresComponent } from './risk-scores.component';

describe('RiskScoresComponent', () => {
  let component: RiskScoresComponent;
  let fixture: ComponentFixture<RiskScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskScoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
