import { environment } from 'src/environments/environment';
import { AddEmployee } from './../data_models/addEmployee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private API_BASE_URL = environment.API_BASE_URL;
  private headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}employee/get-all-employees`, { 'headers': this.headers })
      .pipe(catchError(this.handleError))
  }

  createEmployee(employeeDetails: AddEmployee): Observable<any> {
    return this.http.post<any>(`${this.API_BASE_URL}employee/create-employee`, employeeDetails, { 'headers': this.headers })
      .pipe(catchError(this.handleError))
  }

  getEmployee(employeeId: string): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}employee/get-employee/${employeeId}`, { 'headers': this.headers })
      .pipe(catchError(this.handleError))
  }

  editEmployee(employeeId: string, employeeDetails: AddEmployee): Observable<any> {
    return this.http.patch<any>(`${this.API_BASE_URL}employee/edit-employee/${employeeId}`, employeeDetails, { 'headers': this.headers })
      .pipe(catchError(this.handleError))
  }

  //DONT ADD HEADERS WITH IMAGE UPLOAD
  imageUpload(employeeId: string, formdata: any): Observable<any> {
    return this.http.patch<any>(`${this.API_BASE_URL}employee/image-upload/${employeeId}`, formdata)
      .pipe(catchError(this.handleError))
  }

  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete<any>(`${this.API_BASE_URL}employee/delete-employee/${employeeId}`, { 'headers': this.headers })
      .pipe(catchError(this.handleError))
  }

  handleError(error) {
    return throwError(error.message || 'Sorry! An unknown error occured. Please try again.')
  }


}
