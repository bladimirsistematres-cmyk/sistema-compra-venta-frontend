import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ItemProveedorCambiarNombreDTO } from '../../../../core/models/proveedor-models/itemProveedor/itemProveedorCambiarNombreDTO.interface';
import { ProveedorService } from '../../../../core/services/proveedor-service/proveedor.service';
import { SnackbarService } from '../../../../core/services/animation-service/snackbar.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NombreItemProveedor } from '../../../../core/models/proveedor-models/itemProveedor/nombreItemProveedorDTO.enum';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-item-proveedor-cambiar-nombre',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    FormsModule,
],
  templateUrl: './item-proveedor-cambiar-nombre.component.html',
  styleUrl: './item-proveedor-cambiar-nombre.component.scss'
})
export class ItemProveedorCambiarNombreComponent implements OnInit{

  private fb = inject(FormBuilder);
  private dialog = inject(MatDialogRef<ItemProveedorCambiarNombreComponent>)
  private proveedorService = inject(ProveedorService);
  private snackbarService = inject(SnackbarService);

  idItemProveedor!: number;
  nombresItems = Object.values(NombreItemProveedor);
  formItemProveedorNuevoNombre!: FormGroup;
  isSubmitting = false;

  // Constructor (Recibimos el id del item)
  constructor (@Inject(MAT_DIALOG_DATA) private data: {idItemProveedor: number, nombreItemProveedor: string}){}

  // Metodos o valores con el que se iniciara el componente
  ngOnInit(): void {
    this.idItemProveedor = this.data.idItemProveedor;
    //this.nombreItemProveedor = this.data.nombreItemProveedor;

    this.loadFormulario();   
  }

  // Metodo para cargar el formulario
  loadFormulario(){
    this.formItemProveedorNuevoNombre = this.fb.group({
      idItemProveedor: [this.idItemProveedor, [Validators.required]],
      nuevoNombreItemProveedor: [this.data.nombreItemProveedor || '', [Validators.required]]
    })
  }

  updateChangeNameItemProveedor(){
    
    if (this.formItemProveedorNuevoNombre.invalid) return;
  
    const formDTO: ItemProveedorCambiarNombreDTO = this.formItemProveedorNuevoNombre.value;
    this.isSubmitting = true;

    const peticion$ = this.proveedorService.updateChangeNameItemProveedor(formDTO);

    peticion$.subscribe({
      next: (response) => {
        this.snackbarService.openSnackbar('NOMBRE ACTUALIZADO');
        this.dialog.close(response);
        this.isSubmitting = false;
      },
      error: (err) => {
        this.snackbarService.openSnackbar('ERROR');
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
    const currentValue = this.formItemProveedorNuevoNombre.get(controlName)?.value
    this.formItemProveedorNuevoNombre.get(controlName)?.setValue(currentValue?.toUpperCase(), { emitEvent: false })
  }
}