import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/authentication-models/loginRequest.interface';
import { ResponseRequest } from '../../models/authentication-models/responseRequest.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private router = inject(Router);
  private http = inject(HttpClient);
  private url = 'https://sistema-compra-venta-sastreria-1.onrender.com/api/auth';

  private tokenKey = 'token';
  private roleKey = 'role';

  //Servicio para autentificar al usuario
  authenticationUsuario(credenciales: LoginRequest): Observable<ResponseRequest>{
    return this.http.post<ResponseRequest>(`${this.url}/authentication`, credenciales)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setRole(response.role);
        })
      )
  }

  //Metodo para modificar el token del Local Storage
  private setToken(token: string): void{
    sessionStorage.setItem(this.tokenKey, token);
  }

  //Método para modificar el rol del Local Storage
  private setRole(role: string){
    sessionStorage.setItem(this.roleKey, role)
  }

  //Metodo para llamar el valor del Token en el Local Storage
  private getToken(): string | null{
    if(typeof window !== 'undefined'){
      return sessionStorage.getItem(this.tokenKey);
    }else{
      return null;
    }
  }

  //Método para llamar el valor del Rol en el Local Storage
  private getRole(): string | null{
    if (typeof window !== 'undefined'){
      return sessionStorage.getItem(this.roleKey);
    }else{
      return null;
    }
  }

  //Método para verificar la autenticación de usuario
  isAuthenticate(): boolean{
    const token = this.getToken();

    if(!token){
      return false;
    }

    try{
      const payLoad = JSON.parse(atob(token.split('.')[1]));
      const expiration = payLoad.exp * 1000;

      return Date.now() < expiration;
    }catch (e){
      this.logout();
      return false;
    }
  }

  // Metodo para reemplazar el token 
  public replaceToken(token: string): void{
    if (!token) return;

    sessionStorage.removeItem('token');
    sessionStorage.setItem('token', token);
  }

  //Método para cerrar sesión en el sistema
  logout(): void{
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.roleKey);

    this.router.navigate(['/login'])
  }
}
