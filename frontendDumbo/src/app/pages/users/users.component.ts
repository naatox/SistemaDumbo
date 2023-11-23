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
  user : any = [];
  usersData: any = [];
  constructor(private users: UsersService, private router: Router, private logout: LoginService) { }
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.dtOptions = {
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      },
      pagingType: 'full_numbers',
    };
    this.showUsers();

  }
  showUsers(){
    this.users.getUsers().subscribe((data: any) => {
      console.log(data);
      this.usersData = data;
      this.dtTrigger.next(data);

    });
  }
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
  editUser(id: any){

    this.router.navigate(['usuarios/editar', id]);
  }

  registerUser(){
    this.router.navigate(['usuarios/nuevo']);

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

  }




}
