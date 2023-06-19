import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { InstructorStatisticsFilterValues, InstructorStatisticsItem, InstructorStatisticsResults } from '../model';

@Injectable()
export class InstructorStatisticsService {

  constructor(
    private http: HttpClient
  ) { }

  getFilterValues(): Observable<InstructorStatisticsFilterValues> {
    return this.http.get<InstructorStatisticsFilterValues>('/api/SurvivalAnalysis/GetCourseStatisticsFilters').pipe(
      catchError(err => of(new InstructorStatisticsFilterValues()))
    )
  }

  getResults(filterValues: InstructorStatisticsFilterValues): Observable<InstructorStatisticsResults> {
    return this.http.post<InstructorStatisticsItem[]>('/api/SurvivalAnalysis/GetCourseStatistics', filterValues).pipe(
      map(items => {
        const itemsByInstructor: InstructorStatisticsResults = {};

        items.forEach(item => {
          if (itemsByInstructor[item.teacherName]) {
            itemsByInstructor[item.teacherName].push(item);
          } else {
            itemsByInstructor[item.teacherName] = [item];
          }
        });

        console.log(itemsByInstructor);
        
        return itemsByInstructor;
      })
    )
  }
}
