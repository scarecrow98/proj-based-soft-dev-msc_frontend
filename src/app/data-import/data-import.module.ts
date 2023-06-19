import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataImportComponent } from './data-import.component';
import { RouterModule } from '@angular/router';
import { CdsIconModule } from '@cds/angular';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { DataImportService } from './services/data-import.service';
import { ClrAlertModule } from '@clr/angular';



@NgModule({
  declarations: [
    DataImportComponent,
    UploadFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DataImportComponent }
    ]),
    CdsIconModule,
    ClrAlertModule
  ],
  providers: [
    DataImportService
  ]
})
export class DataImportModule { }
