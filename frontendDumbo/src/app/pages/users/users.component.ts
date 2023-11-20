import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/User/users.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  user : any = [];
  usersData: any = [];
  constructor(private users: UsersService, private router: Router) { }
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
    type LoginFormResult = {
      firstName: string
      points: string
    }
    let firstNameInput: HTMLInputElement
    let pointsInput: HTMLInputElement
    Swal.fire<LoginFormResult>({
      title: 'Login Form',
      html: `
        <input type="text" id="firstName" class="swal2-input" placeholder="firstName">
        <input type="points" id="points" class="swal2-input" placeholder="points">
      `,
      confirmButtonText: 'Sign in',
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!
        firstNameInput = popup.querySelector('#firstName') as HTMLInputElement
        pointsInput = popup.querySelector('#points') as HTMLInputElement
        firstNameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
        pointsInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
      },
      preConfirm: () => {
        const firstName = firstNameInput.value
        const points = pointsInput.value
        if (!firstName || !points) {
          Swal.showValidationMessage(`Please enter firstName and points`)
        }
        return { firstName, points }
      },
    })
  }

  registerUser(){
    this.router.navigate(['usuarios/nuevo']);

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

  }



}
