import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'data-import',
        loadChildren: () => import('../data-import/data-import.module').then(m => m.DataImportModule)
      },
      {
        path: 'user-management',
        loadChildren: () => import('../user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        path: 'instructor-statistics',
        loadChildren: () => import('../instructor-statistics/instructor-statistics.module').then(m => m.InstructorStatisticsModule)
      },
      {
        path: 'survival-analysis',
        loadChildren: () => import('../survival-analysis/survival-analysis.module').then(m => m.SurvivalAnalysisModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
