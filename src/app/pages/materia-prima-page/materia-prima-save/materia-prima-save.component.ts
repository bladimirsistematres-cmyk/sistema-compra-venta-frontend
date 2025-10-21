import { Component, Inject, inject, OnInit } from '@angular/core';
import { MateriaPrimaService } from '../../../core/services/materia-prima-service/materia-prima.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NombreItemProveedor } from '../../../core/models/proveedor-models/itemProveedor/nombreItemProveedorDTO.enum';
import { UnidadMedida } from '../../../core/models/proveedor-models/itemProveedor/unidadMedida.enum';
import { MateriaPrimaRequestDTO } from '../../../core/models/materia-prima/materiaPrimaRequestDTO.interface';
import { SnackbarService } from '../../../core/services/animation-service/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-materia-prima-save',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
],
  templateUrl: './materia-prima-save.component.html',
  styleUrl: './materia-prima-save.component.scss'
})
export class MateriaPrimaSaveComponent implements OnInit{

  // Variables
  private materiaPrimaService = inject(MateriaPrimaService);
  private snackBarService = inject(SnackbarService);
  private dialog = inject(MatDialogRef<MateriaPrimaSaveComponent>)
  private fb = inject(FormBuilder);
  
  isSubmitting = false;
  idProveedor!: number;
  nombreComercial!: string;

  public mensajeProcesando!: string;  
  public nombresMateriaPrima = Object.values(NombreItemProveedor)
  public unidadMedidad = Object.values(UnidadMedida)
  public formMateriaPrima!: FormGroup 

  constructor(@Inject(MAT_DIALOG_DATA) private data: {idProveedor: number, nombreComercial: string}){}

  ngOnInit(): void {
    this.idProveedor = this.data.idProveedor;
    this.nombreComercial = this.data.nombreComercial;
    this.loadFormulario();
  }

  // Metodo para crear el formulario
  private loadFormulario(){
    this.formMateriaPrima = this.fb.group({
      nombreMateriaPrima: ['', [Validators.required]],
      marca: [''],
      modelo: [''],
      unidadMedida: ['', [Validators.required]],
      stockActual: [{value: 0, disabled: true}],
      descripcion: ['', [Validators.required]],
      idProveedor: [this.data.idProveedor, [Validators.required]]
    })
  }

  // Metodo para crear una nueva materia prima
  savedMateriaPrima(){
    if (this.formMateriaPrima?.invalid) return;

    const formDTO: MateriaPrimaRequestDTO = this.formMateriaPrima!.value
    
    if (!formDTO.marca || formDTO.marca.trim() === ''){
      formDTO.marca = 'SIN DEFINIR';
    }   

    if (!formDTO.modelo || formDTO.modelo.trim() === ''){
      formDTO.modelo = 'SIN DEFINIR';
    }

    this.isSubmitting = true;
    this.mensajeProcesando = 'Materia Prima Creado';

    const $peticion = this.materiaPrimaService.createMateriaPrima(formDTO);

    $peticion.subscribe({
      next: (response) => {
        this.snackBarService.openSnackbar('Materia Prima Creado');
        this.dialog.close({exito: true});
        this.isSubmitting = false;
      },
      error: (err) => {
        this.snackBarService.openSnackbar('Error al crear ma materia prima. Intente nuevamente')
        this.isSubmitting = false
      }
    })
  }

  // Metodo para cerrar la ventana modal
  closeModal(){
    this.dialog.close();
  }

  // Metodo para convertir el texto ingresado a mayusculas de los inputs
  toUpperCaseField(controlName: string): void {  
    const currentValue = this.formMateriaPrima.get(controlName)?.value
    this.formMateriaPrima.get(controlName)?.setValue(currentValue?.toUpperCase(), { emitEvent: false })
  }
}