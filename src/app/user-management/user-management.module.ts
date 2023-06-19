import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { RouterModule } from '@angular/router';
import { ClrDatagridModule, ClrFormsModule, ClrInputModule, ClrRadioModule, ClrSelectModule } from '@clr/angular';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserManagementService } from './services/user-management.service';



@NgModule({
  declarations: [
    UserManagementComponent,
    RegisterUserFormComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UserManagementComponent }
    ]),
    ReactiveFormsModule,
    ClrFormsModule,
    ClrInputModule,
    ClrRadioModule,
    ClrDatagridModule
  ],
  providers: [
    UserManagementService
  ]
})
export class UserManagementModule { }
