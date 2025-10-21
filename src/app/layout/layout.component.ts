import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu'
import { AuthenticationService } from '../core/services/authentication-service/authentication.service';

@Component({
  selector: 'app-layout',
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatSidenavModule, 
    RouterOutlet, 
    MatTooltipModule, 
    RouterLink, 
    MatMenuModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  
  isMenuOpenUsuarios = false;
  isMenuOpenProveedor = false;
  isMenuOpenContrato = false;
  isMenuOpenMateriaPrima = false;
  isCompra = false;

  private authenticationService = inject(AuthenticationService);

  //Método para cerrar sesión en el sistema
  logout(){
    this.authenticationService.logout();
  }
}