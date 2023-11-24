import { Component, OnInit } from '@angular/core';
import { UsersComponent } from '../users.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/User/users.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent{
  /**
   * Propiedades del componente para almacenar información del usuario y mensajes de error.
   */
  private id = this.user.snapshot.paramMap.get('id')
  firstName: string ='' ;
  lastName: string = '';
  email: string = '';
  points: number = 0;
  message: string = '';
  form: FormGroup;
  data: any = [];


  /**
   * Constructor del componente de edición de usuarios.
   * Inicializa el formulario reactivo con controles para el nombre, apellido, correo electrónico y puntos del usuario.
   * @param user - Proporciona acceso a los parámetros de la URL, como el ID del usuario a editar.
   * @param service - Servicio que proporciona métodos para editar usuarios.
   * @param router - Facilita la navegación a través de la aplicación.
   */
  constructor(private user: ActivatedRoute, private service: UsersService,private router: Router){
    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      points: new FormControl()
    });
  }
  /**
   * Configuración inicial del componente.
   * Obtiene los datos del usuario a editar y los asigna a las propiedades del componente.
   */
  ngOnInit(): void {
    this.service.getUser(this.id).subscribe((data: any) => {
      this.data = data.user;

    });
  }
  /**
   * Maneja la presentación del formulario de edición de usuarios.
   * Realiza una llamada al servicio para editar el usuario con los valores del formulario.
   * Si la edición es exitosa, navega a la página de usuarios.
   * Si hay un error, muestra un mensaje de error y restablece el formulario.
   */
  onSubmit(){
    const alert = document.getElementById('alert');

    this.service.editUser(this.form.value, this.id).subscribe(
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
