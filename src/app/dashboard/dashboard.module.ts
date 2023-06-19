import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ClrVerticalNavModule } from '@clr/angular';
import { CdsIconModule } from '@cds/angular';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ClrVerticalNavModule,
    CdsIconModule
  ]
})
export class DashboardModule { }
