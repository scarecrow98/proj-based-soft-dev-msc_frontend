import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorStatisticsComponent } from './instructor-statistics.component';
import { RouterModule } from '@angular/router';
import { ClrAccordionModule, ClrAlertModule, ClrSelectModule, ClrTabsModule } from '@clr/angular';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { StatResultsComponent } from './components/stat-results/stat-results.component';
import { InstructorStatisticsService } from './services/instructor-statistics.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InstructorStatisticsComponent,
    FilterBarComponent,
    StatResultsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: InstructorStatisticsComponent }
    ]),
    ClrAccordionModule,
    ClrSelectModule,
    NgSelectModule,
    ReactiveFormsModule,
    ClrAlertModule
  ],
  providers: [
    InstructorStatisticsService
  ]
})
export class InstructorStatisticsModule { }
