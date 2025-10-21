import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RepresentanteListarDTO } from '../../../../core/models/proveedor-models/representante/representanteListarDTO.interface';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ProveedorService } from '../../../../core/services/proveedor-service/proveedor.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-representante-listar-proveedor',
  imports: [
    MatDialogContent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBar,
    MatTooltipModule,
    CommonModule,
],
  templateUrl: './representante-listar-proveedor.component.html',
  styleUrl: './representante-listar-proveedor.component.scss'
})
export class RepresentanteListarProveedorComponent implements OnInit{

  private dialog = inject(MatDialogRef<RepresentanteListarProveedorComponent>)
  private proveedorService = inject(ProveedorService)
  
  idProveedor!: number;
  nombreComercial!: string;
  representantes: RepresentanteListarDTO[] = []
  isLoading = true;

  constructor (@Inject(MAT_DIALOG_DATA) private data: {idProveedor: number, nombreComercial: string}){}

  ngOnInit(): void {
    this.idProveedor = this.data.idProveedor;
    this.nombreComercial = this.data.nombreComercial;
    this.cargarRepresentantes(this.idProveedor);
  }

  // Metodo para cargar los represenantes de un proveedor consumiendo el servicio
  cargarRepresentantes(idProveedor: number){
    this.proveedorService.getAllRepresentantesByProveedor(idProveedor).subscribe({
      next: (data) => {
        this.representantes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  // Metodo para cerrar la ventana modal
  closeModal(){
    this.dialog.close();
  }
}