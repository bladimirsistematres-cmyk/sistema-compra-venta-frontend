import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GeneroRepresentante } from '../../../../core/models/proveedor-models/representante/generoRepresentante.enum';
import { RepresentanteRequestDTO } from '../../../../core/models/proveedor-models/representante/representanteRequestDTO.interface';
import { ProveedorService } from '../../../../core/services/proveedor-service/proveedor.service';
import { SnackbarService } from '../../../../core/services/animation-service/snackbar.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-representante-guardar',
  imports: [MatDialogActions, MatDialogClose, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatDialogContent, MatProgressBarModule],
  templateUrl: './representante-guardar.component.html',
  styleUrl: './representante-guardar.component.scss'
})
export class RepresentanteGuardarComponent implements OnInit{

  private proveedorService = inject(ProveedorService);
  private snackbarService = inject(SnackbarService);
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<RepresentanteGuardarComponent>);

  idProveedor!: number;
  nombreComercial!: string;
  formRepresentante!: FormGroup;
  isSubmitting = false;
  generos = Object.values(GeneroRepresentante);

  constructor(@Inject(MAT_DIALOG_DATA) private data: {idProveedor: number, nombreComercial: string}){}
  
  ngOnInit(): void {
    this.idProveedor = this.data.idProveedor;
    this.nombreComercial = this.data.nombreComercial;
    this.loadFormulario();
  }
  
  // Metodo para cargar el formulario
  private loadFormulario(){
    this.formRepresentante = this.fb.group({
      nombre: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      cedulaIdentidad: ['', [Validators.required]],
      generoRepresentante: ['', [Validators.required]],
      telefonoFijo: [null],
      telefonoCelular: ['', [Validators.required]],
      correoElectronico: [null],
      direccion: [null],
      observaciones: [null],
      idProveedor: [this.idProveedor, [Validators.required]]
    })
  }

  // Metodo para agregar el nuevo representante en el proveedor
  addRepresentanteForProveedor(){

    const formDTO: RepresentanteRequestDTO = this.formRepresentante!.value;

    const peticion$ = this.proveedorService.createRepresentante(formDTO);
    this.isSubmitting = true;

    peticion$.subscribe({
      next: (response) => {
        this.snackbarService.openSnackbar('REPRESENTANTE CREADO');
        this.dialogRef.close({exito: true});
        this.isSubmitting = false;
      },
      error: (err) => {
        this.snackbarService.openSnackbar('ERROR DE CREACIÓN');
        this.isSubmitting = false;
      }
    })
  }

  // Metodo para convertir el texto ingresado a mayusculas de los inputs
  toUpperCaseField(controlName: string): void {  
      const currentValue = this.formRepresentante.get(controlName)?.value
    this.formRepresentante.get(controlName)?.setValue(currentValue?.toUpperCase(), { emitEvent: false })
  }

  // Método para cerrar la ventana modal
  closeModal() {
    this.dialogRef.close();
  }
}