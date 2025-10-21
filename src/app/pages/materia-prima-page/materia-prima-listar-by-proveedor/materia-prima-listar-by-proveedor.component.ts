import { Component, Inject, inject, OnInit } from '@angular/core';
import { MateriaPrimaService } from '../../../core/services/materia-prima-service/materia-prima.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MateriaPrimaResponseDTO } from '../../../core/models/materia-prima/materiaPrimaResponseDTO.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MateriaPrimaComprarComponent } from '../materia-prima-comprar/materia-prima-comprar.component';

@Component({
  selector: 'app-materia-prima-listar-by-proveedor',
  imports: [
    MatDialogContent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBar,
    MatTooltipModule,
    CommonModule,
],
  templateUrl: './materia-prima-listar-by-proveedor.component.html',
  styleUrl: './materia-prima-listar-by-proveedor.component.scss'
})
export class MateriaPrimaListarByProveedorComponent implements OnInit {

  private dialog = inject(MatDialogRef<MateriaPrimaListarByProveedorComponent>);
  private dialogOpen = inject(MatDialog);
  private materiaPrimaService = inject(MateriaPrimaService);

  idProveedor!: number;
  nombreComercial!: string
  materiasPrimas: MateriaPrimaResponseDTO[] = [];
  idLoading = true;

  constructor (@Inject(MAT_DIALOG_DATA) private data: {idProveedor: number; nombreComercial: string}){}

  ngOnInit(): void {
    this.idProveedor = this.data.idProveedor;
    this.nombreComercial = this.data.nombreComercial;
    this.cargarMateriaPrima(this.idProveedor);
  }

  // Metodo para cargar la materia prima de un proveedor 
  cargarMateriaPrima(idProveedor: number){

    this.idLoading = true;

    this.materiaPrimaService.getMateriaPrimaByProveedor(idProveedor).subscribe({
      next: (data) => {
        this.materiasPrimas = data;
        this.idLoading = false;
      },
      error: (err) => {
        console.log(err)
        this.idLoading = false;
      }
    })
  }

  // Metodo para abrir el modal Comprar Materia Prima
  onComprarMateriaPrima(idProveedor: number, idMateriaPrima: number, nombreMateriaPrima: string, nombreComercial: string){
    const dialogRef = this.dialogOpen.open(MateriaPrimaComprarComponent, {
      width: '60vw',
      maxWidth: '60vw',
      data: {
        idProveedor,
        idMateriaPrima,
        nombreMateriaPrima,
        nombreComercial
      }
    })


  }

  // Metodo para cerrar la ventana modal
  closeModal(){
    this.dialog.close();
  }
}