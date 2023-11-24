import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/Auth/login.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: string ='' ;
  password: string = '';
  form: FormGroup;
  message: string = '';
  data: any = [];

  constructor(private loginService: LoginService, private router: Router) {
    this.form = new FormGroup({
      user: new FormControl(),
      password: new FormControl( )
    });
  }

  /**
   * Maneja el envío del formulario para el componente de inicio de sesión.
   * Realiza una llamada a la API al servicio de inicio de sesión con los valores del formulario.
   * Si el inicio de sesión es exitoso, almacena el token de autorización en el almacenamiento local y navega a la página de inicio.
   * Si hay un error, muestra un mensaje de error y restablece el formulario.
   */
  async onSubmit() {
    const alert = document.getElementById('alert');
    const response = await this.loginService.login(this.form.value).subscribe(
      (data) => {
        // Manejar la respuesta exitosa aquí
        localStorage.setItem('token', data.authorization.token);
        this.router.navigate(['/inicio']);

      },
      (error) => {
        // Manejar el error aquí
        this.message = error.error.message;
        if(!this.message){
          this.message = 'Error de servidor';

        }

        if (alert != null){
          alert.style.display = 'block';
          this.form.reset();
        }

        console.error('Error al registrar usuario', error);
      });;

  }

}
