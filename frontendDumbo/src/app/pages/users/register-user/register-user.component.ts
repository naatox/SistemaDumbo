import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/User/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  firstName: string ='' ;
  lastName: string = '';
  idNumber: string = '';
  email: string = '';
  points: number = 0;

  form: FormGroup;

  constructor(private users: UsersService,private router: Router) {
    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      idNumber: new FormControl(),
      email: new FormControl(),
      points: new FormControl()
    });
  }
  async onSubmit() {
    const response = this.users.registerUser(this.form.value);
    this.router.navigate(['/usuarios']);

  }

}
