import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsuarioService } from '../../../core/services/usuario-service/usuario.service';
import { SnackbarService } from '../../../core/services/animation-service/snackbar.service';
import { UsuarioUpdatePasswordDTO } from '../../../core/models/usuario-models/usuarioUpdatePassword.interface';
import { AuthenticationService } from '../../../core/services/authentication-service/authentication.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-usuario-edit-password',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBar,
    ReactiveFormsModule
  ],
  templateUrl: './usuario-edit-password.component.html',
  styleUrl: './usuario-edit-password.component.scss'
})

export class UsuarioEditPasswordComponent implements OnInit{

  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthenticationService);
  private snackBarService = inject(SnackbarService);
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UsuarioEditPasswordComponent>);


  public hideOne = signal(true);
  public hideTwo = signal(true);
  public formUser!: FormGroup;
  public idUsuario!: number;
  public isLoading = true;
  public isSubmitting = false;


  constructor(@Inject(MAT_DIALOG_DATA) private data: {id_usuario: number}){}


  ngOnInit(): void {
    this.idUsuario = this.data.id_usuario;

    this.formUser = this.fb.group({
      actualPassword: ['', [Validators.required, Validators.minLength(8)]],
      nuevoPassword: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  // Metodo para actualizar la contraseña del usuario
  updatePassword(): void{
    
    if (this.formUser.invalid) return;
  
    const dto: UsuarioUpdatePasswordDTO = {
      actualPassword: this.formUser.get('actualPassword')!.value,
      nuevoPassword: this.formUser.get('nuevoPassword')!.value
    };

    this.isSubmitting = true;

    this.usuarioService.updatePasswordUsuario(this.data.id_usuario, dto)
      .subscribe({
        next: (res) => {
          this.snackBarService.openSnackbar("Cantraseña actualizada");

          setTimeout(() => {
            this.authService.replaceToken(res.token);
          }, 4000);

          this.dialogRef.close({exito: true});
          this.isSubmitting = false;
        },
        error: (err) => {
          this.snackBarService.openSnackbar("Error, verificar");
          this.isSubmitting = false;
        }
      });
  }

  // Metodo para ver la contraseña
  clickEventViewPasswordOne(event: MouseEvent){
    this.hideOne.set(!this.hideOne())
    event.stopPropagation();
  }

  // Metodo para ver la contraseña
  clickEventViewPasswordTwo(event: MouseEvent){
    this.hideTwo.set(!this.hideTwo())
    event.stopPropagation();
  }

  // Metodo para cerrar el modal
  closeModal(): void{
    this.dialogRef.close();
  }
}