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
    return !!sessionStorage.getItem('x-auth-token');
  }

  logout()
  {
    sessionStorage.removeItem('x-auth-token');
    sessionStorage.removeItem('metamask-verified');
    sessionStorage.removeItem('account-id');
    localStorage.removeItem('user-bio');
    localStorage.removeItem('user-name');
  }

  errorHandler(error: HttpErrorResponse)
  {
    return observableThrowError(error.message || "Server Error");
  }
}
