import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProveedorCambiarNombreDTO } from '../../../../core/models/proveedor-models/proveedor/proveedorCambiarNombreDTO.interface';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProveedorService } from '../../../../core/services/proveedor-service/proveedor.service';
import { SnackbarService } from '../../../../core/services/animation-service/snackbar.service';

@Component({
  selector: 'app-proveedor-cambiar-nombre',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
],
  templateUrl: './proveedor-cambiar-nombre.component.html',
  styleUrl: './proveedor-cambiar-nombre.component.scss'
})
export class ProveedorCambiarNombreComponent implements OnInit{

  private dialog = inject(MatDialogRef<ProveedorCambiarNombreComponent>);
  private proveedorService = inject(ProveedorService);
  private snackbarService = inject(SnackbarService);
  private fb = inject(FormBuilder);
  
  idProveedor!: number;
  nombreComercial!: string;
  isSubmitting = false;
  ProveedorCambiarNombre?: ProveedorCambiarNombreDTO
  formCambiarNombre!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: {idProveedor: number, nombreComercial: string}){}

  ngOnInit(): void {
    this.idProveedor = this.data.idProveedor;
    this.nombreComercial = this.data.nombreComercial;
    this.loadFormulario();
  }

  // Metodo para iniciar el formulario
  private loadFormulario(){
    this.formCambiarNombre = this.fb.group({
      idProveedor: [this.idProveedor, [Validators.required]],
      nuevoNombre: [this.nombreComercial || '', [Validators.required]],
    })
  }

  // Metodo para cambiar el nombre del proveedor
  updateChangeName(){

    if (this.formCambiarNombre.invalid) return;
    
    const formDTO: ProveedorCambiarNombreDTO = this.formCambiarNombre.value;
    this.isSubmitting = true;

    const peticion$ = this.proveedorService.updateChangeNameProveedor(formDTO);
    
    peticion$.subscribe({
      next: (response) => {
        this.snackbarService.openSnackbar('Nombre Actualizado')
        this.dialog.close({exito: true});
        this.isSubmitting = false;
      },
      error: (err) => {
        this.snackbarService.openSnackbar('Error')
        this.isSubmitting = false;
      }
    })
  }

  // Metodo para cerrar la ventana modal
  closeModal(){
    this.dialog.close();
  }

  // Metodo para convertir el texto ingresado a mayusculas de los inputs
  toUpperCaseField(controlName: string): void {  
    const currentValue = this.formCambiarNombre.get(controlName)?.value
    this.formCambiarNombre.get(controlName)?.setValue(currentValue?.toUpperCase(), { emitEvent: false })
  }
}