import { Component, OnInit, ViewChild } from '@angular/core';
import { UserManagementService } from './services/user-management.service';
import { RegistrateUserPayload } from './models';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';
import { OnToggleAdminPayload } from './components/user-list/user-list.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  
  @ViewChild('registrationForm', { static: true })
  private registrationForm?: RegisterUserFormComponent;

  constructor(
    public userManagementService: UserManagementService,
    private toast: ToastrService
    ) { }

  ngOnInit(): void {
    this.userManagementService.fetchUsers();
  }

  registerUser(payload: RegistrateUserPayload) {
    this.userManagementService.registerUser(payload).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          this.toast.error(err.error);
        }
        return of(null)
      })
    ).subscribe(createdUser => {
      if (createdUser) {
        this.toast.success(`User with name [${createdUser.userName}] created`);
        this.userManagementService.fetchUsers();
        this.registrationForm?.reset();
      }
    });
  }

  toggleAdmin(event: OnToggleAdminPayload) {
    const request = event.isAdmin
                        ? this.userManagementService.addUserToAdminRole(event.userId) 
                        : this.userManagementService.removeUserFromAdminRole(event.userId);

    request.subscribe({
      next: () => {
        this.toast.success('User\'s role successfully changed!');
      },
      error: () => {
        this.toast.error('An error occured while changing user roles');
      }
    });
  }

}
