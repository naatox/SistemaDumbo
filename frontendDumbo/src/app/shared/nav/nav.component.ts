import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/Auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private logout: LoginService) { }
  logoutBtn(){
    this.logout.logout();
  }

}
