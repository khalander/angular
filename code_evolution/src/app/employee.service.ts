import { Injectable } from '@angular/core';
import {throwError as observableThrowError, Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEmployee } from './employee'
import { tap, catchError} from 'rxjs/operators';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private  http:HttpClient) { }

  private  _url: string = "/assets/data/employees.json"

  // getEmployeeList() {
  //   return [
  //     {"id" : 1, "name" : "Mufeez", "age" : 7},
  //     {"id" : 2, "name" : "Rabia", "age" : 2},
  //     {"id" : 3, "name" : "Fathima", "age" : 2}
  //   ]
  // }

  getEmployeeList() {
    return this.http.get<IEmployee[]>(this._url)
      .pipe(tap(data => JSON.stringify(data)), catchError(this.errorHandler))

  }

  errorHandler (error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server error")
  }


}

@Injectable({
  providedIn: 'root'
})
export class GreetService {
  
  private _teacherGreetSource = new Subject<string>();
  
  teacherGreeted$ = this._teacherGreetSource.asObservable();

  greet(message: string) {
    this._teacherGreetSource.next(message)
  }
  
}
