import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InstructorStatisticsFilterValues, InstructorStatisticsItem, InstructorStatisticsResults } from './model';
import { InstructorStatisticsService } from './services/instructor-statistics.service';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, share, shareReplay, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-instructor-statistics',
  templateUrl: './instructor-statistics.component.html',
  styleUrls: ['./instructor-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstructorStatisticsComponent implements OnInit {

  private _loading$ = new BehaviorSubject<boolean>(false);

  private _filterChanged$ = new BehaviorSubject<InstructorStatisticsFilterValues|null>(null);

  filterValues$ = this.statService.getFilterValues().pipe(share());

  loading$ = this._loading$.asObservable();

  results$: Observable<InstructorStatisticsResults|null> = this._filterChanged$.pipe(
    tap(_ => this._loading$.next(true)),
    switchMap(filterValues => filterValues ? this.statService.getResults(filterValues) : of(null)),
    catchError(err => of(null)),
    tap(_ => this._loading$.next(false))
  );

  constructor(
    private statService: InstructorStatisticsService 
  ) { }

  ngOnInit(): void {

  }

  filterResults(filterValues: InstructorStatisticsFilterValues) {
    // this.filterValues$.pipe(
    //   take(1)
    // ).subscribe(_filterValues => {
    //   console.log(_filterValues);
    //   this._filterChanged$.next(_filterValues);
    // })
    this._filterChanged$.next(filterValues);
  }

}
