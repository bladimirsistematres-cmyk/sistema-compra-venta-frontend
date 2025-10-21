import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../core/services/usuario-service/usuario.service';
import { SnackbarService } from '../../../core/services/animation-service/snackbar.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioUpdateDTO } from '../../../core/models/usuario-models/usuarioUpdate.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-usuario-edit-campos',
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
    ReactiveFormsModule,
],
  templateUrl: './usuario-edit-campos.component.html',
  styleUrl: './usuario-edit-campos.component.scss'
})
export class UsuarioEditCamposComponent implements OnInit{

  private usuarioService = inject(UsuarioService);
  private snackbarService = inject(SnackbarService);
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UsuarioEditCamposComponent>);
  

  public formUsuario!: FormGroup;
  public idUsuario!: number
  public isLoading = true;
  public isSubmitting = false;


  constructor (@Inject(MAT_DIALOG_DATA) private data: {id_usuario: number}){}

  ngOnInit(): void {
    this.idUsuario = this.data.id_usuario;

    this.formUsuario = this.fb.group({
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      carnetIdentidad: ['', Validators.required]
    });

    this.loadDataUsuario(this.idUsuario);
  }

  // Cargar datos del usuario
  loadDataUsuario(idUsuario: number): void{
    this.isLoading = true;
    this.usuarioService.getUsuarioById(idUsuario)
      .subscribe(usuario => {
        this.formUsuario.patchValue({
          nombres: usuario.nombres,
          apellidoPaterno: usuario.apellidoPaterno,
          apellidoMaterno: usuario.apellidoMaterno,
          carnetIdentidad: usuario.carnetIdentidad
        });
        this.isLoading = false;
      })
  }

  // Guardar cambios de la actualizacion 
  saveChangesUsuario(): void{
    if (this.formUsuario.invalid) return;

    const dto: UsuarioUpdateDTO = this.formUsuario.value;
    this.isSubmitting = true;

    this.usuarioService.updateUsuario(this.idUsuario, dto)
      .subscribe({
        next: () => {
          this.snackbarService.openSnackbar("Usuario actualizado")
          this.dialogRef.close({exito: true})
          this.isSubmitting = false;
        },
        error: (err) => {
          this.snackbarService.openSnackbar("Error al actualizar");
          this.isSubmitting = false;
        }
      })
  }

  // Cerrar Modal
  closeModal(): void{
    this.dialogRef.close();
  }
}