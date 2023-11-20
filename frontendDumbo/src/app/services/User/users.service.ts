import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  data: any = [];

  constructor(private http: HttpClient) { }
  dtTrigger: Subject<any> = new Subject<any>();
  private baseUrl = 'http://127.0.0.1:8000';


  getUsers(){
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/api/getUsers`, {headers, responseType: 'json'});
  }
  deleteUser(id: any){
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}/api/deleteUser?id=${id}`, {headers, responseType: 'json'});
  }
  registerUser(formValue: any){
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return firstValueFrom( this.http.post(`${this.baseUrl}/api/registerUser`, formValue, {headers, responseType: 'json'}));
  }
}
