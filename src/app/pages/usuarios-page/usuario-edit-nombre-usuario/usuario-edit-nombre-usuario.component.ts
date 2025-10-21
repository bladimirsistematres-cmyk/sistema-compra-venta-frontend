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
import { AuthenticationService } from '../../../core/services/authentication-service/authentication.service';

@Component({
  selector: 'app-usuario-edit-nombre-usuario',
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
  templateUrl: './usuario-edit-nombre-usuario.component.html',
  styleUrl: './usuario-edit-nombre-usuario.component.scss'
})
export class UsuarioEditNombreUsuarioComponent implements OnInit{

  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthenticationService);
  private snackBarService = inject(SnackbarService);
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UsuarioEditNombreUsuarioComponent>);


  public formUsuario!: FormGroup;
  public idUsuario!: number;
  public isLoading = true;
  public isSubmitting = false;


  constructor(@Inject(MAT_DIALOG_DATA) private data: {id_usuario: number, nombreUsuario: string}){}


  ngOnInit(): void {
    this.idUsuario = this.data.id_usuario;   

    this.formUsuario = this.fb.group({
      nombreUsuario: [ this.data.nombreUsuario ],
      nuevoNombreUsuario: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Metodo para actualizar el nombre de usuario
  updateNombreUsuario(): void{
    if (this.formUsuario.invalid) return;

    const nuevoNombre = this.formUsuario.get('nuevoNombreUsuario')?.value;
    this.isSubmitting = true;

    this.usuarioService.updateNombreUsuario(this.idUsuario, nuevoNombre)
      .subscribe({
        next: (res) => {
          this.snackBarService.openSnackbar("Nombre de usuario actualizado. Redirigiendo al login...");

          setTimeout(() => {
            this.authService.logout();
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

  // Metodo para cerrar el modal
  closeModal(): void{
    this.dialogRef.close();
  }
}