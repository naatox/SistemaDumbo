import { EventEmitter, Inject, Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError,BehaviorSubject,tap, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Servicio de autenticación para manejar el inicio de sesión y el cierre de sesión.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string;


  /**
   * Constructor del servicio de autenticación.
   * @param http - Cliente HTTP para realizar solicitudes.
   * @param router - Facilita la navegación a través de la aplicación.
   */
  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = 'http://127.0.0.1:8000';
   }
    /**
   * Realiza una solicitud de inicio de sesión con los datos del formulario.
   * @param formValue - Datos del formulario de inicio de sesión.
   * @returns Observable con la respuesta del servidor.
   */
  login(formValue: any){
    return this.http.post<any>(`${this.apiUrl}/api/login`, formValue);
  }
  /**
   * Cierra la sesión del usuario, eliminando el token de autorización.
   * Redirige al usuario a la página de inicio de sesión.
   */
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }
  /**
   * Verifica si el usuario está autenticado.
   * @returns True si el token de autorización está presente en el almacenamiento local, de lo contrario, false.
   */
  isLogged(){
    return !!localStorage.getItem('token');
  }

}
