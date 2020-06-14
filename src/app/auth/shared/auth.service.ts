import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { GlobalConstants } from '../../common/data/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(existingUser): Observable<any>
  {
    return (this.http.post<any>(GlobalConstants.loginUserURL, existingUser, {observe: 'response'}).pipe(catchError(this.errorHandler)));
  }

  create(newUser): Observable<any>
  {
    return (this.http.post<any>(GlobalConstants.registerUserURL, newUser).pipe(catchError(this.errorHandler)));
  }

  loggedIn()
  {
    return !!localStorage.getItem('x-auth-token');
  }

  logout()
  {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('metamask-verified');
    localStorage.removeItem('account-id');
  }

  errorHandler(error: HttpErrorResponse)
  {
    return observableThrowError(error.message || "Server Error");
  }
}
