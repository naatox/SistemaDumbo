import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    private router:Router,
    private loginService:LoginService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
  ){}
  ngOnInit(): void {

  }

  loginForm=this.formBuilder.group({
    user: [
      '',
    [Validators.required]],
    password:[
      '',
    [Validators.required]],
  })
  loginError: string="";


  login(){
    if(this.loginForm.valid){
      const credentials = this.loginForm.value as LoginRequest;
      this.loginService.login(credentials).subscribe({
        next:(userData) => {
          console.log(userData);
          // Almacena los datos del usuarios en el servicio
          this.loginService.setUserLoggedIn(userData);
          // GUARDA EL TOKEN EN COOKIES

          this.cookieService.set('token', userData.token);
          // Redirige al usuario a la pagina de inicio
          this.router.navigateByUrl('/inicio');
          // Reset form
          this.loginForm.reset();
        },
        error:(errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          console.info("Login Completo")
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      console.log("Error en un campo");
    }
  }
  get user(){
    return this.loginForm.controls.user;
  }

  get password(){
    return this.loginForm.controls.password;
  }




}

