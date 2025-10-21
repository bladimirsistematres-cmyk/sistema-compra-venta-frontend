import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider, MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Usuario } from '../../../core/models/usuario-models/usuario.interface';
import { UsuarioEditCamposComponent } from '../usuario-edit-campos/usuario-edit-campos.component';
import { A11yModule } from "@angular/cdk/a11y";
import { UsuarioEditNombreUsuarioComponent } from '../usuario-edit-nombre-usuario/usuario-edit-nombre-usuario.component';
import { UsuarioEditPasswordComponent } from '../usuario-edit-password/usuario-edit-password.component';

@Component({
  selector: 'app-usuario-bottom-sheet',
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    A11yModule
],
  templateUrl: './usuario-bottom-sheet.component.html',
  styleUrl: './usuario-bottom-sheet.component.scss'
})
export class UsuarioBottomSheetComponent implements OnInit{

  private dialog = inject(MatDialog);


  constructor (
    private bottomSheet: MatBottomSheetRef<UsuarioBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: {id_usuario: number, nombreUsuario: string}
  ){}

  ngOnInit(): void {
    
  }

  // Metodo para editar datos del usuario
  onEditCamposUsuario(){
    const dialogRef = this.dialog.open(UsuarioEditCamposComponent, {
      width: '80vw',
      maxWidth: '80vw', 
      disableClose: true,
      data: { id_usuario: this.data.id_usuario }
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result?.exito){
          this.bottomSheet.dismiss({accion: 'REFRESCAR'})
        }
      });
  }

  // Metodo para aditar el nombre de usuario
  onEditNombreUsuario(){
    const dialogRef = this.dialog.open(UsuarioEditNombreUsuarioComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true,
      data: {
        id_usuario: this.data.id_usuario,
        nombreUsuario: this.data.nombreUsuario
      }
    })

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result?.exito){
          this.bottomSheet.dismiss({accion: 'REFRESCAR'})
        }
      })
  }
  
  // Metodo para editar la contraseña del usuario
  onEditPassword(){
    const dialogRef = this.dialog.open(UsuarioEditPasswordComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true,
      data: { id_usuario: this.data.id_usuario }
    })

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result?.exito){
          this.bottomSheet.dismiss({accion: 'REFRESCAR'})
        }
      })
  }
}