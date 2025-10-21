import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../../core/services/usuario-service/usuario.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { map } from 'rxjs';
import { Usuario } from '../../../core/models/usuario-models/usuario.interface';
import { UsuarioListarTablaComponent } from '../usuario-listar-tabla/usuario-listar-tabla.component';
import { UsuarioListarCardComponent } from '../usuario-listar-card/usuario-listar-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from "@angular/material/button";
import { ProgressAnimationComponent } from '../../../core/animation/progress-animation/progress-animation.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioEditCamposComponent } from '../usuario-edit-campos/usuario-edit-campos.component';
import { UsuarioEditNombreUsuarioComponent } from '../usuario-edit-nombre-usuario/usuario-edit-nombre-usuario.component';
import { UsuarioEditPasswordComponent } from '../usuario-edit-password/usuario-edit-password.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UsuarioBottomSheetComponent } from '../usuario-bottom-sheet/usuario-bottom-sheet.component';

@Component({
  selector: 'app-usuario-presentacion',
  imports: [
    ProgressAnimationComponent,
    UsuarioListarTablaComponent,
    UsuarioListarCardComponent,
    MatButtonModule,
    MatButtonToggleModule
],
  templateUrl: './usuario-presentacion.component.html',
  styleUrl: './usuario-presentacion.component.scss'
})
export class UsuarioPresentacionComponent implements OnInit{
  
  //Variables 
  private dialog = inject(MatDialog);
  private usuarioService = inject(UsuarioService);
  private breakpointObserver = inject(BreakpointObserver);
  private bottomSheet = inject(MatBottomSheet);
  private isMovile$ = this.breakpointObserver.observe(Breakpoints.HandsetPortrait).pipe(
    map(result => result.matches)
  );

  public usuarios: Usuario[] = []

  isMovile = toSignal(this.isMovile$, {initialValue: false});

  public isCargando = false;
  public errorConexion = false;
  public cargando = false;

  ngOnInit(): void {
    this.cargarUsuarios()
  }

  // Metodo para abrir el bottom sheet
  onOpenOptionUsuario(usuario: Usuario){
    const isMovile = this.isMovile$;

    if (isMovile){
      const ref = this.bottomSheet.open(UsuarioBottomSheetComponent, {
        data: {id_usuario: usuario.id_usuario, nombreUsuario: usuario.nombreUsuario}
      })

      ref 
        .afterDismissed()
        .subscribe(result => {
          if (result?.accion === 'REFRESCAR') this.cargarUsuarios();
        })
    }
  }

  // Metodo para abrir el modal para editar los campos del usuario
  onEditUsuario(id_usuario: number){
    const dialogRef = this.dialog.open(UsuarioEditCamposComponent, {
      width: '80vw',
      maxWidth: '80vw', 
      disableClose: true,
      data: {id_usuario}
    });

    dialogRef
      .afterClosed()
      .subscribe((result: any | undefined) => {
        if (result){
          this.cargarUsuarios();
        }
      });
  }

  // Metodo para actualizar el nombre de usuario
  onEditarNombreUsuario(data: {id_usuario: number, nombreUsuario: string}){
    const dialogRef = this.dialog.open(UsuarioEditNombreUsuarioComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true,
      data: {
        id_usuario: data.id_usuario,
        nombreUsuario: data.nombreUsuario
      }
    });

    dialogRef
      .afterClosed()
      .subscribe((result: any | undefined) => {
        if (result){
          this.cargarUsuarios();
        }
      })
  }

  // Metodo para actualizar la contraseña del usuario
  onEditarPasswordUsuario(id_usuario: number){
    const dialogRef = this.dialog.open(UsuarioEditPasswordComponent, {
      width: '80vw',
      maxWidth: '80vw',
      //disableClose: true
      data: {id_usuario}
    });

    dialogRef
      .afterClosed()
      .subscribe((result: any | undefined) => {
        if (result){
          this.cargarUsuarios();
        }
      })
  }

  // Metodo para cargar los usuarios
  cargarUsuarios(){
    this.isCargando = true;
    this.errorConexion = false;
    this.cargando = true;

    this.usuarioService.getAllUsuarios()
      .subscribe({
        next: (data) => {
          this.usuarios = data;
          this.cargando = false;
          this.isCargando = false;
        },
        error: (err) => {
          this.errorConexion = true;
          this.isCargando = false;
        }
      })
  }
}