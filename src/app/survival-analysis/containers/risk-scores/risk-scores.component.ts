import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SurvivalPrediction } from '../../models.';
import { SurvivalAnalysisService } from '../../services/survival-analysis.service';

@Component({
  selector: 'app-risk-scores',
  templateUrl: './risk-scores.component.html',
  styleUrls: ['./risk-scores.component.scss']
})
export class RiskScoresComponent implements OnInit {

  order: 'asc' | 'desc' = 'desc';

  predictions$ = new BehaviorSubject<SurvivalPrediction[]>([]);

  constructor(
    private survivalAnalysisService: SurvivalAnalysisService
  ) { }

  ngOnInit(): void {
    this.fetchPredictions();
  }

  fetchPredictions() {
    this.survivalAnalysisService.getSurvivalPredictionsOrdered(this.order).subscribe(resp => {
      this.predictions$.next(resp);
    });
  }
}
