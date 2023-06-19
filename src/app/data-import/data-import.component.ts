import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImportResult } from './models';
import { DataImportService } from './services/data-import.service';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataImportComponent implements OnInit {

  courseStatisticsLoading$ = new BehaviorSubject<boolean>(false);
  courseImportResult$ = new BehaviorSubject<ImportResult|null>(null);
  studentStatisticsLoading$ = new BehaviorSubject<boolean>(false);
  studentImportResult$ = new BehaviorSubject<ImportResult|null>(null);

  constructor(
    private dataImportService: DataImportService
  ) { }

  ngOnInit(): void {
  }

  importCourseStatistics(file: File|null) {
    if (!file) {
      return;
    }

    this.courseStatisticsLoading$.next(true);

    this.dataImportService.importCouseStatistics(file).subscribe({
      next: (res) => {
        this.courseStatisticsLoading$.next(false);
        console.log('res', res)
        this.courseImportResult$.next({
          success: true,
          message: 'Dataset imported successfully'
        });
      },
      error: (err) => {
        console.log(err)
        this.courseStatisticsLoading$.next(false);
        this.courseImportResult$.next({
          success: false,
          message: 'An error occured while importing the dataset.'
        });
      }
    });
  }

  importSurvivalAnalysis(file: File|null) {
    if (!file) {
      return;
    }

    this.studentStatisticsLoading$.next(true);

    this.dataImportService.importSurvivalAnalysis(file).subscribe({
      next: (res: any) => {
        this.studentStatisticsLoading$.next(false);
        if (res.exceptionMessage) {
          this.studentImportResult$.next({
            success: false,
            message: 'Error occured during import'
          });
        } else {
          this.studentImportResult$.next({
            success: true,
            message: 'Dataset imported successfully'
          });
        }
      },
      error: (err) => {
        console.log(err)
        this.studentStatisticsLoading$.next(false);
        this.studentImportResult$.next({
          success: false,
          message: 'An error occured while importing the dataset.'
        });
      }
    });
  }



}
