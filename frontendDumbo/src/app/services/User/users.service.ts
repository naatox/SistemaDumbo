import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, firstValueFrom } from 'rxjs';

/**
 * Servicio de usuarios para manejar las solicitudes a la API.
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  data: any = [];
  /**
   * Constructor del servicio de usuarios.
   * @param http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) { }
  /**
   * Observable para DataTables que emite eventos cuando se actualiza la lista de usuarios.
   */
  dtTrigger: Subject<any> = new Subject<any>();
  private baseUrl = 'http://127.0.0.1:8000';

  /**
   * Obtiene la lista de usuarios desde la API.
   * @returns Observable con la respuesta del servidor.
   */
  getUsers(){
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/api/getUsers`, {headers, responseType: 'json'});
  }
  /**
   * Elimina un usuario según su ID.
   * @param id - ID del usuario a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  deleteUser(id: any){
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}/api/deleteUser?id=${id}`, {headers, responseType: 'json'});
  }
  /**
   * Registra un nuevo usuario mediante la API.
   * @param formValue - Datos del formulario para registrar al usuario.
   * @returns Observable con la respuesta del servidor.
   */
  registerUser(formValue: any){

      const token = localStorage.getItem('token');
      console.log(token);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post(`${this.baseUrl}/api/registerUser`, formValue, {headers, responseType: 'json'});



  }
  /**
   * Edita la información de un usuario según su ID.
   * @param formValue - Datos del formulario para actualizar al usuario.
   * @param id - ID del usuario a editar.
   * @returns Observable con la respuesta del servidor.
   */
  editUser(formValue: any, id: any){
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.patch(`${this.baseUrl}/api/updateUser?id=${id}`, formValue, {headers, responseType: 'json'});
  }
}
