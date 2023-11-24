import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/User/users.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  /**
   * Propiedades del componente para almacenar información del usuario y mensajes de error.
   */
  firstName: string ='' ;
  lastName: string = '';
  idNumber: string = '';
  email: string = '';
  points: number = 0;
  message: string = '';
  form: FormGroup;
  /**
   * Constructor del componente de registro de usuarios.
   * Inicializa el formulario reactivo con controles para el nombre, apellido, número de identificación, correo electrónico y puntos del usuario.
   * @param users - Servicio que proporciona métodos para registrar usuarios.
   * @param router - Facilita la navegación a través de la aplicación.
   */
  constructor(private users: UsersService,private router: Router) {
    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      idNumber: new FormControl(),
      email: new FormControl(),
      points: new FormControl()
    });
  }

  /**
   * Maneja el envío del formulario de registro de usuarios.
   * Realiza una llamada al servicio para registrar al usuario con los valores del formulario.
   * Si el registro es exitoso, navega a la página de usuarios.
   * Si hay un error, muestra un mensaje de error y restablece el formulario.
   */
  async onSubmit() {

  const alert = document.getElementById('alert');
    this.users.registerUser(this.form.value).subscribe(
      (data) => {
        // Manejar la respuesta exitosa aquí
        this.router.navigate(['/usuarios']);
      },
      (error) => {
        // Manejar el error aquí
        this.message = error.error.message;

        if (alert != null){
          alert.style.display = 'block';
          this.form.reset();
        }

        console.error('Error al registrar usuario', error);
      });




  }


}
