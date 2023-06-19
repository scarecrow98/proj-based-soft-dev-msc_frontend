import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserListItem } from '../../core/models/user.model';
import { RegistrateUserPayload } from '../models';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserManagementService {

  private readonly _users$ = new BehaviorSubject<UserListItem[]>([]);

  users$ = this._users$.asObservable();

  constructor(private http: HttpClient) { }

  fetchUsers(): void {
    this.http.get<UserListItem[]>('/api/Authentication/GetAllUsers').pipe(
      catchError(err => of([]))
    ).subscribe(users => this._users$.next(users));
  }

  registerUser(payload: RegistrateUserPayload) {
    return this.http.post<User>('/api/Authentication/RegisterUser', payload);
  }

  addUserToAdminRole(userId: string) {
    return this.http.post('/api/Authentication/AddUserToAdminRole', {  }, {
      params: {
        userId
      }
    });
  }

  removeUserFromAdminRole(userId: string) {
    return this.http.post('/api/Authentication/RemoveUserFromAdmins', {  }, {
      params: {
        userId
      }
    });
  }
}
