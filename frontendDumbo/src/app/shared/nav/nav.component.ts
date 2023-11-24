import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/Auth/login.service';

/**
 * Componente para la barra de navegación.
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  /**
   * Constructor del componente.
   * @param logout - Servicio para cerrar sesión.
    */
  constructor(private logout: LoginService) { }
  /**
   * Cierra la sesión del usuario.
   */
  logoutBtn(){
    this.logout.logout();
  }

}
