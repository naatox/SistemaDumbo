import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/User/users.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/Auth/login.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  /**
   * Componente para mostrar y gestionar la lista de usuarios.
   */
  user : any = [];
  usersData: any = [];
  /**
   * Constructor del componente.
   * @param users - Servicio que proporciona métodos para gestionar usuarios.
   * @param router - Facilita la navegación a través de la aplicación.
   * @param logout - Servicio para cerrar sesión.
   */
  constructor(private users: UsersService, private router: Router, private logout: LoginService) { }
  dtTrigger: Subject<any> = new Subject<any>(); //para el datatable
  dtOptions: DataTables.Settings = {}; //para el datatable

  /**
   * Configuración inicial del componente.
   * Se inicializan las opciones de DataTables y se muestra la lista de usuarios al cargar la página.
   */
  ngOnInit() {
    this.dtOptions = {
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      },
      pagingType: 'full_numbers',
    };
    this.showUsers();

  }
  /**
   * Obtiene y muestra la lista de usuarios desde el servicio.
   * Se utiliza DataTables para mejorar la presentación de la tabla.
   */
  showUsers(){
    this.users.getUsers().subscribe((data: any) => {
      console.log(data);
      this.usersData = data;
      this.dtTrigger.next(data);

    });
  }
  /**
   * Elimina un usuario según su ID.
   * Muestra un cuadro de confirmación antes de realizar la acción.
   * Recarga la página después de la eliminación exitosa.
   * @param id - ID del usuario a eliminar.
   */
  deleteUser(id: any){
    const form = document.getElementById('formSubmit') as HTMLFormElement;
    Swal.fire({
      title: "Estas seguro que deseas eliminar al usuario?",
      text: "No podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        this.users.deleteUser(id).subscribe((data: any) => {
          console.log(data);

            Swal.fire({
              text: data.message,
              icon: "success",
            }).then(function(){
              window.location.reload();
            });
        });
      }
    });

  }
  /**
   * Redirige a la página de edición de un usuario según su ID.
   * @param id - ID del usuario a editar.
   */
  editUser(id: any){

    this.router.navigate(['usuarios/editar', id]);
  }
  /**
   * Redirige a la página de registro de un nuevo usuario.
   */
  registerUser(){
    this.router.navigate(['usuarios/nuevo']);

  }
  /**
   * Se ejecuta al destruir el componente.
   * Desuscribe las suscripciones de DataTables.
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

  }




}
