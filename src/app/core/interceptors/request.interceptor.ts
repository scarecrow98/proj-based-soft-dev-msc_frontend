import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JWT_TOKEN_LS_KEY } from '../utils/constants';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestCopy = request.clone({
      url: `${environment.apiUrl}${request.url}`,
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(JWT_TOKEN_LS_KEY) || ''}`
      })
    });

    return next.handle(requestCopy);
  }
}
