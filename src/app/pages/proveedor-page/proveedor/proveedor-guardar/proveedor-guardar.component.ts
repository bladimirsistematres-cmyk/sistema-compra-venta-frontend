import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProveedorService } from '../../../../core/services/proveedor-service/proveedor.service';
import { SnackbarService } from '../../../../core/services/animation-service/snackbar.service';
import { RepresentanteGuardarComponent } from '../../representante/representante-guardar/representante-guardar.component';
import { ProveedorResponseDTO } from '../../../../core/models/proveedor-models/proveedor/proveedorResponseDTO.interface';
import { ProveedorRequestDTO } from '../../../../core/models/proveedor-models/proveedor/proveedorRequestDTO.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CiudadListarDTO } from '../../../../core/models/proveedor-models/ciudad/ciudadListarDTO.interface';
import { MatProgressBar } from "@angular/material/progress-bar";
import { isExclamationToken } from 'typescript';
import { TipoProveedor } from '../../../../core/models/proveedor-models/proveedor/tipoProveedor.enum';

@Component({
  selector: 'app-proveedor-guardar',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatProgressBar
],
  templateUrl: './proveedor-guardar.component.html',
  styleUrl: './proveedor-guardar.component.scss',
})
export class ProveedorGuardarComponent implements OnInit {
  private proveedorService = inject(ProveedorService);
  private snackbarService = inject(SnackbarService);
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<RepresentanteGuardarComponent>);

  errorEmail: string = 'ejemplocorreo@gmail.com';

  formProveedor!: FormGroup;
  proveedor?: ProveedorResponseDTO;

  tipoProveedores = Object.values(TipoProveedor)
  ciudades: CiudadListarDTO[] = [];

  isLoading = true;
  isSubmitting = false;

  mensajeProcesando = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data: { idProveedor?: number; soloLectura?: boolean }){}
    
  ngOnInit(): void {
    console.log(this.tipoProveedores)
    this.loadFormulario();
    this.loadCiudades().then(() => {
      if (this.data.idProveedor){
        this.loadProveedor(this.data.idProveedor);
      }else{
        this.isLoading = false;
      }
    })
  }

  // Metodo para cargar el proveedor
  private loadProveedor(idProveedor: number){
    this.isLoading = true;
    this.proveedorService.getProveedorById(idProveedor)
      .subscribe({
        next: (proveedor) => {
          this.proveedor = proveedor;
          let tipoValido: TipoProveedor | null = null;

          if (proveedor.tipoProveedor){
            const tipoNormalizado = proveedor.tipoProveedor.toString().trim().toUpperCase();
            if (Object.values(TipoProveedor).includes(tipoNormalizado as TipoProveedor)){
              tipoValido = tipoNormalizado as TipoProveedor;
            }
          }

          this.formProveedor.patchValue({
            nombreComercial: proveedor.nombreComercial || '',
            identificacionFiscal: proveedor.identificacionFiscal || '',
            correoElectronico: proveedor.correoElectronico || null,
            direccion: proveedor.direccion || '',
            enlacePagina: proveedor.enlacePagina || null,
            tipoProveedor: tipoValido,
            idCiudad: proveedor.idCiudad || ''
          });

          this.isLoading = false;
        },
        error: (err) => {
          console.log('Error al cargar el proveedor');
          this.isLoading = false;
        }
      })
  }

  // Metodo para iniciar el formulario
  private loadFormulario() {
    this.formProveedor = this.fb.group({
      nombreComercial: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      identificacionFiscal: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
        ],
      ],
      correoElectronico: [null, [Validators.email]],
      direccion: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      enlacePagina: [null],
      tipoProveedor: ['', [Validators.required]],
      idCiudad: ['', [Validators.required]],
    });
  }

  // Cerrar Modal
  closeModal() {
    this.dialogRef.close();
  }

  // Metodo para guardar
  saveProveedor() {

    if (this.formProveedor?.invalid) return;

    const formDTO: ProveedorRequestDTO = this.formProveedor!.value;
    this.isSubmitting = true;
    this.mensajeProcesando = this.proveedor ? 'Actualizando Proveedor...' : 'Registrando Proveedor...'

    const peticion$ = this.proveedor 
      ? this.proveedorService.updateProveedor(this.proveedor.idProveedor, formDTO)
      : this.proveedorService.createProveedor(formDTO);


    peticion$.subscribe({
      next: (response) => {
        this.snackbarService.openSnackbar(
          this.proveedor ? 'Proveedor Actualizado con éxito' : 'Proveedor Creado con éxito'
        );
        this.dialogRef.close({exito: true});
        this.isSubmitting = false;
      },
      error: (err) => {
        this.snackbarService.openSnackbar('Error al guadar el proveedor. Intente nuevamente')
        this.isSubmitting = false;
      }
    })
  }

  // Cargar ciudades
  loadCiudades(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.proveedorService.getAllCiudadesSinPage().subscribe({
        next: (ciudad) => {
          this.ciudades = ciudad;
          resolve();
        },
        error: (err) => {
          reject();
        }
      });
    });
  }

  // Metodo para convertir el texto a mayusculas de los inputs
  toUpperCaseField(controlName: string): void{
    const currentValue = this.formProveedor.get(controlName)?.value
    this.formProveedor.get(controlName)?.setValue(currentValue?.toUpperCase(), { emitEvent: false })
  }
}
