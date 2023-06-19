import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurvivalAnalysisComponent } from './survival-analysis.component';
import { RouterModule } from '@angular/router';
import { ClrDatagridModule, ClrTabsModule } from '@clr/angular';
import { SurvivalAnalysisService } from './services/survival-analysis.service';
import { SurvivalStatsComponent } from './containers/survival-stats/survival-stats.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { StatResultsComponent } from './components/stat-results/stat-results.component';
import { PredictionResultsComponent } from './components/prediction-results/prediction-results.component';
import { RiskScoresComponent } from './containers/risk-scores/risk-scores.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SurvivalAnalysisComponent,
    SurvivalStatsComponent,
    StatResultsComponent,
    PredictionResultsComponent,
    RiskScoresComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SurvivalAnalysisComponent }
    ]),
    ClrTabsModule,
    NgSelectModule,
    ClrDatagridModule,
    FormsModule
  ],
  providers: [
    SurvivalAnalysisService
  ]
})
export class SurvivalAnalysisModule { }
