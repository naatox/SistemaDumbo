import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/Auth/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: string ='' ;
  password: string = '';

  form: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {
    this.form = new FormGroup({
      user: new FormControl(),
      password: new FormControl( )
    });
  }

  async onSubmit() {

    const response = await this.loginService.login(this.form.value);
    localStorage.setItem('token', response.authorization.token);
    this.router.navigate(['/inicio']);

  }

}
