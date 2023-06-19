import { Component, OnInit } from '@angular/core';
import { SurvivalAnalysisService } from '../../services/survival-analysis.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { SurvivalPrediction, SurvivalStatistic } from '../../models.';

@Component({
  selector: 'app-survival-stats',
  templateUrl: './survival-stats.component.html',
  styleUrls: ['./survival-stats.component.scss']
})
export class SurvivalStatsComponent implements OnInit {

  private _prediction$ = new BehaviorSubject<SurvivalPrediction|null>(null);
  private _stats$ = new BehaviorSubject<SurvivalStatistic|null>(null);

  prediction$ = this._prediction$.asObservable();
  stats$ = this._stats$.asObservable();

  constructor(
    public survivalAnalysisService: SurvivalAnalysisService
  ) { }

  ngOnInit(): void {
  }

  onFilterChange(neptunCode: string) {
    if (!neptunCode) {
      return;
    }

    combineLatest([
      this.survivalAnalysisService.getSurvivalStatistics(neptunCode),
      this.survivalAnalysisService.getSurvivalPrediction(neptunCode),
    ]).pipe(take(1)).subscribe(([stats, prediction]) => {
      this._prediction$.next(prediction);
      this._stats$.next(stats);
    });
  }

}
