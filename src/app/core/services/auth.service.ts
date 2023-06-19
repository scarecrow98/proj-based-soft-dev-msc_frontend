import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, interval, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, UserRole } from '../models/user.model';
import { JWT_EXPIRATION_LS_KEY, JWT_REFRESH_TOKEN_LS_KEY, JWT_TOKEN_LS_KEY } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user$ = new BehaviorSubject<User|null>(null);

  private _refreshTimer$ = interval(60 * 1000);

  private _refreshTimerSub: Subscription|null = null;

  public readonly user$ = this._user$.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<{
      token: string,
      expiration: string
    }>('/api/Authentication/Login', { username, password }).pipe(
      tap(response => {
        localStorage.setItem(JWT_TOKEN_LS_KEY, response.token);
        localStorage.setItem(JWT_EXPIRATION_LS_KEY, response.expiration);
      })
    )
  }

  check(): Observable<boolean> {
    const jwtToken = localStorage.getItem(JWT_TOKEN_LS_KEY) || '';
    return this.http.post<{ user: User, userRoles: UserRole[] }>(`/api/Authentication/GetPrincipalByToken?token=${jwtToken}`, {}).pipe(
      tap(resp => {
        const user: User = { ...resp.user, userRoles: resp.userRoles };
        this._user$.next(user);
        console.log(user.refreshToken);
        localStorage.setItem(JWT_REFRESH_TOKEN_LS_KEY, user.refreshToken);

        console.log(this._refreshTimerSub);
        if (!this._refreshTimerSub) {
          this.startRefreshTimer();
        }
      }),
      map(_ => true),
      catchError(err => of(false))
    );
  }

  refreshToken() {
    this.http.post<{ accessToken: string, refreshToken: string }>('/api/Authentication/RefreshToken', {
      accessToken: localStorage.getItem(JWT_TOKEN_LS_KEY),
      refreshToken: localStorage.getItem(JWT_REFRESH_TOKEN_LS_KEY)
    }).subscribe(resp => {
      localStorage.setItem(JWT_TOKEN_LS_KEY, resp.accessToken);
      localStorage.setItem(JWT_REFRESH_TOKEN_LS_KEY, resp.refreshToken);
    })
  }

  logout() {
    this._refreshTimerSub?.unsubscribe();
    this._refreshTimerSub = null;
    localStorage.clear();
    console.log('logout');
  }

  private startRefreshTimer() {
    console.log('Refresh timer started');
    this._refreshTimerSub = this._refreshTimer$.subscribe(() => {
      console.log('refresh');
      this.refreshToken();
    });
  }

  
}
