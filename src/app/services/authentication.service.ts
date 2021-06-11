import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Admin } from './../data_models/admin.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private API_BASE_URL = environment.API_BASE_URL;

  constructor(private http: HttpClient, private router: Router) { }

  login(adminCredential: Admin): Observable<any> {
    return this.http.post<any>(`${this.API_BASE_URL}auth/login`, adminCredential)
      .pipe(catchError(this.handleError))
  }

  handleError(error) {
    return throwError(error.message || 'Sorry! something went wrong. Please try again later')
  }

  //if 'token' exist in localStorage it will return 'true' else 'false'
  isLoggedIn() {
    return !!localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token')
  }



}
