import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SnackbarService } from '../../../core/services/animation-service/snackbar.service';
import { UnidadCompra } from '../../../core/models/proveedor-models/itemProveedor/unidadCompra.enum';
import { UnidadMedida } from '../../../core/models/proveedor-models/itemProveedor/unidadMedida.enum';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CompraService } from '../../../core/services/compra-service/compra.service';
import { CompraRequestDTO } from '../../../core/models/compra-models/compraRequestDTO.interface';

@Component({
  selector: 'app-materia-prima-comprar',
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
    MatDialogClose
],
  templateUrl: './materia-prima-comprar.component.html',
  styleUrl: './materia-prima-comprar.component.scss'
})
export class MateriaPrimaComprarComponent implements OnInit{

  private dialog = inject(MatDialogRef<MateriaPrimaComprarComponent>);
  private snackBarService = inject(SnackbarService);
  private comprarService = inject(CompraService);
  private fb = inject(FormBuilder);

  public formMateriaPrimaComprar!: FormGroup;
  public listaUnidadCompra = Object.values(UnidadCompra);
  public listaUnidadMedida = Object.values(UnidadMedida);

  mensaje!: string;
  isSubmitting = false;
  idProveedor!: number;
  idMateriaPrima!: number;
  nombreMateriaPrima!: string;
  nombreComercial!: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: {idProveedor: number, idMateriaPrima: number, nombreMateriaPrima: string, nombreComercial: string}){}

  ngOnInit(): void {
    this.idProveedor = this.data.idProveedor;
    this.idMateriaPrima = this.data.idMateriaPrima;
    this.nombreMateriaPrima = this.data.nombreMateriaPrima;
    this.nombreComercial = this.data.nombreComercial;

    this.loadFormulario();
  }

  // Metodo para cargar el formulario
  private loadFormulario(){
    this.formMateriaPrimaComprar = this.fb.group({
      idProveedor: [this.idProveedor, [Validators.required]],
      totalCompra: ['', [Validators.required, Validators.min(0)]],
      detalle: this.fb.group({
        unidadCompra: ['', [Validators.required]],
        cantidadCompra: ['', [Validators.required, Validators.min(0)]],
        unidadMedida: ['', [Validators.required]],
        cantidadMedida: ['', Validators.required, Validators.min(0)],
        materiaPrima: [this.idMateriaPrima, [Validators.required]]
      })
    })
  }

  // Metodo para crear una nueva compra de una materia prima
  public savedComprarMateriaPrima(){
    if (this.formMateriaPrimaComprar?.invalid) return;

    const formDTO: CompraRequestDTO = this.formMateriaPrimaComprar!.value;

    this.isSubmitting = true;
    this.mensaje = 'Compra Exitosa';

    const $peticion = this.comprarService.createCompraMateriaPrima(formDTO);

    $peticion.subscribe({
      next: (response) => {
        this.snackBarService.openSnackbar('COMPRA EXITOSA');
        this.dialog.close(response);
        this.isSubmitting = false;
      },
      error: (err) => {
        this.snackBarService.openSnackbar('ERROR, VERIFICAR');
        this.isSubmitting = false;
      }
    })
  }

  // Metodo para cerrar la ventana modal
  closeModal(){
    this.dialog.close();
  }
}