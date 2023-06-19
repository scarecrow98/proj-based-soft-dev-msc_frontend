import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SurvivalAnalysisFilterValues, SurvivalPrediction, SurvivalStatistic } from '../models.';
import { catchError, share, map } from 'rxjs/operators';

@Injectable()
export class SurvivalAnalysisService {

  filterValues$ = this.getFilterValues().pipe(
    share()
  );

  constructor(private http: HttpClient) { }

  getFilterValues(): Observable<SurvivalAnalysisFilterValues> {
    return this.http.get<SurvivalAnalysisFilterValues>('/api/SurvivalAnalysis/GetSurvivalAnalysisFilters').pipe(
      catchError(err => of(new SurvivalAnalysisFilterValues()))
    )
  }

  getSurvivalPrediction(neptunCode: string) {
    return this.http.post<SurvivalPrediction[]>('/api/SurvivalAnalysis/GetSurvivalAnalysisPrediction', {
      neptunCodes: [neptunCode]
    }).pipe(
      map(resp => (resp && resp.length > 0) ? resp[0] : null ),
      catchError(err => of(null))
    )
  }

  getSurvivalStatistics(neptunCode: string) {
    return this.http.post<SurvivalStatistic[]>('/api/SurvivalAnalysis/GetSurvivalAnalysisStatistics', {
      neptunCodes: [neptunCode]
    }).pipe(
      map(resp => (resp && resp.length > 0) ? resp[0] : null ),
      catchError(err => of(null))
    )
  }

  getSurvivalPredictionsOrdered(order: 'asc' | 'desc') {
    const body = { neptunCodes: [] };
    return order === 'asc'
            ? this.http.post<SurvivalPrediction[]>('/api/SurvivalAnalysis/GetSurvivalAnalysisPredictionAsc', body)
            : this.http.post<SurvivalPrediction[]>('/api/SurvivalAnalysis/GetSurvivalAnalysisPredictionDesc', body);
  }
}
