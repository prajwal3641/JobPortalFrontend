import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base_url = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) {}

  // Register user
  registerUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.base_url}/register`, user).pipe(
      // throw the same err ,as we got from backend
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  // Login user
  loginUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.base_url}/login`, user).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  sendOtp(email: string) {
    return this.httpClient.post(this.base_url + `/sendOtp/${email}`, {}).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  verifyOtp(email: string, otp: string) {
    return this.httpClient
      .get(this.base_url + `/verifyOtp/${email}/${otp}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  changePassword(email: string, password: string) {
    return this.httpClient
      .post(this.base_url + '/changePassword', {
        email: email,
        password: password,
      })
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
