import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../../models/usuario-models/usuario.interface';
import { UsuarioUpdateDTO } from '../../models/usuario-models/usuarioUpdate.interface';
import { JwtActualizacionResponse } from '../../models/usuario-models/jwtUsuarioResponse.interface';
import { UsuarioUpdatePasswordDTO } from '../../models/usuario-models/usuarioUpdatePassword.interface';
import { TokenResponse } from '../../models/usuario-models/tokenResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient)
  private url = 'https://sistema-compra-venta-sastreria-1.onrender.com/api/usuarios/'

  // LISTADOS
  getAllUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.url}listarUsuarios`)
  }

  // BUSQUEDAS
  getUsuarioById(id: number): Observable<any>{
    return this.http.get(`${this.url}buscarUsuario/${id}`)
  }

  // ACTUALIZACIONES

  // Servicio para actualizar los datos del usuario
  updateUsuario(id_usuario: number, usuarioUpdateDTO: UsuarioUpdateDTO): Observable<any>{
    return this.http.put(`${this.url}actualizarUsuario/${id_usuario}`, usuarioUpdateDTO);
  }

  // Servicio para actualizar el nombre de usuario
  updateNombreUsuario(id_usuario: number, nuevoNombreUsuario: string): Observable<JwtActualizacionResponse>{
    const body = { nuevoNombreUsuario };

    return this.http.put<JwtActualizacionResponse>(`${this.url}updateNombreUsuario/${id_usuario}`, body)
      .pipe(
        tap((response) => {
          if (response && response.token){
            sessionStorage.setItem('token', response.token);
          }
        })
      )
  }

  // Servicio para actualizar la contraseña del usuario
  updatePasswordUsuario(id_usuario: number, dto: UsuarioUpdatePasswordDTO): Observable<TokenResponse>{
    return this.http.put<TokenResponse>(`${this.url}updatePassword/${id_usuario}`, dto)
      .pipe(
        tap((response) => {
          if (response && response.token){
            sessionStorage.removeItem('token')
            sessionStorage.setItem('token', response.token);
          }
        })
      )
  }
}
