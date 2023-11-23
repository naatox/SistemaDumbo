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
export class EditUserComponent implements OnInit {
  private id = this.user.snapshot.paramMap.get('id')
  firstName: string ='' ;
  lastName: string = '';
  email: string = '';
  points: number = 0;
  message: string = '';
  form: FormGroup;
  data: any = [];



  constructor(private user: ActivatedRoute, private service: UsersService,private router: Router){
    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      points: new FormControl()
    });
  }
  ngOnInit(){

  }
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
        });;





  }


}
