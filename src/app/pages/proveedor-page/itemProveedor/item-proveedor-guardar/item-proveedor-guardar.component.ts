import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UnidadMedida } from '../../../../core/models/proveedor-models/itemProveedor/unidadMedida.enum';
import { MatSelectModule } from '@angular/material/select';
import { TipoItem } from '../../../../core/models/proveedor-models/itemProveedor/tipoItem.enum';
import { ItemProveedorRequestDTO } from '../../../../core/models/proveedor-models/itemProveedor/itemProveedorRequestDTO.interface';
import { ItemProveedorResponseDTO } from '../../../../core/models/proveedor-models/itemProveedor/itemProveedorResponseDTO.interface';
import { ProveedorService } from '../../../../core/services/proveedor-service/proveedor.service';
import { SnackbarService } from '../../../../core/services/animation-service/snackbar.service';
import { UnidadCompra } from '../../../../core/models/proveedor-models/itemProveedor/unidadCompra.enum';
import { NombreItemProveedor } from '../../../../core/models/proveedor-models/itemProveedor/nombreItemProveedorDTO.enum';

@Component({
  selector: 'app-item-proveedor-guardar',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogActions
],
  templateUrl: './item-proveedor-guardar.component.html',
  styleUrl: './item-proveedor-guardar.component.scss'
})
export class ItemProveedorGuardarComponent implements OnInit{

  private dialog = inject(MatDialogRef<ItemProveedorGuardarComponent>);
  private fb = inject(FormBuilder); 
  private proveedorService = inject(ProveedorService);
  private snackbarService = inject(SnackbarService);

  idProveedor!: number;
  nombreComercial!: string
  mensajeProcesando!: string;
  isSubmitting = false;
  nombresItems = Object.values(NombreItemProveedor)
  unidadCompras = Object.values(UnidadCompra);
  unidadMedidas = Object.values(UnidadMedida);
  tipoItems = Object.values(TipoItem);
  itemProveedor?: ItemProveedorResponseDTO
  formItemProveedor!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: {idProveedor: number, nombreComercial: string}){}

  ngOnInit(): void {
    this.idProveedor = this.data.idProveedor
    this.nombreComercial = this.data.nombreComercial
    this.loadFormulario()
  }

  // Metodo para cerrar la ventana modal
  closeModal() {
    this.dialog.close();
  }

  // Metodo para inicar el formulario
  private loadFormulario(){
    this.formItemProveedor = this.fb.group({
      nombreItemProveedor: ['', [Validators.required]],
      marca: [],
      modelo: [],
      unidadCompra: ['', [Validators.required]],
      cantidadUnidadCompra: ['', [Validators.required]],
      unidadMedida: ['', [Validators.required]],
      cantidadUnidadMedida: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      tipoItem: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      idProveedor: [this.idProveedor, [Validators.required]]
    })
  }

  // Metodo para crear un nuevo item proveedor
  saveItemProveedor() {

    if (this.formItemProveedor?.invalid) return;

    const formDTO: ItemProveedorRequestDTO = this.formItemProveedor!.value;
    this.isSubmitting = true;
    this.mensajeProcesando = 'Item Proveedor Creado';
    
    const peticion$ = this.proveedorService.createItemProveedor(formDTO);

    peticion$.subscribe({
      next: (response) => {
        this.snackbarService.openSnackbar('Item Proveedor Creado')
        this.dialog.close(response);
        this.isSubmitting = false;
      },
      error: (err) => {
        this.snackbarService.openSnackbar('Error al crear el item proveedor. Intente nuevamente')
        this.isSubmitting = false;
      }
    })
  }

  // Metodo para convertir el texto ingresado a mayusculas de los inputs
  toUpperCaseField(controlName: string): void {  
    const currentValue = this.formItemProveedor.get(controlName)?.value
    this.formItemProveedor.get(controlName)?.setValue(currentValue?.toUpperCase(), { emitEvent: false })
  }
}