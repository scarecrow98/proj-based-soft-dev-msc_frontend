import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ClrCheckboxModule, ClrInputModule, ClrPasswordModule, ClrSpinnerModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ClrPasswordModule,
    ClrInputModule,
    ClrCheckboxModule,
    ClrSpinnerModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent }
    ]),
    ReactiveFormsModule
  ]
})
export class LoginModule { }
