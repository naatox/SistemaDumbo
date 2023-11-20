import { EventEmitter, Inject, Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError,BehaviorSubject,tap, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string;


  constructor(private http: HttpClient) {
    this.apiUrl = 'http://127.0.0.1:8000';
   }

  login(formValue: any){
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}/api/login`, formValue));
  }

}
