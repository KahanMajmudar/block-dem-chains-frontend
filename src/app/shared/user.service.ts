import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { GlobalConstants } from '../common/data/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  viewUserInfo(addressObj): Observable<any> {
    return (this.http.post<any>(GlobalConstants.viewUserInfoURL, addressObj).pipe(catchError(this.errorHandler)));
  }

  addUserInfo(userObj): Observable<any> {
    return (this.http.post<any>(GlobalConstants.addUserInfoURL, userObj).pipe(catchError(this.errorHandler)));
  }

  errorHandler(error: HttpErrorResponse)
  {
    return observableThrowError(error.message || "Server Error");
  }
}