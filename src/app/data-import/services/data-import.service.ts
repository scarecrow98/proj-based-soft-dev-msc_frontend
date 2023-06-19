import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class DataImportService {

  constructor(private http: HttpClient) { }

  importCouseStatistics(excelFile: File) {
    const formData = new FormData();
    formData.append('file', excelFile);
    return this.http.post('/api/Import/ImportCourseStatisticsExcelFile', formData);
  }

  
  importSurvivalAnalysis(excelFile: File) {
    const formData = new FormData();
    formData.append('file', excelFile);
    return this.http.post('/api/Import/ImportSurvivalAnalysisExcelFile', formData);
  }
}
