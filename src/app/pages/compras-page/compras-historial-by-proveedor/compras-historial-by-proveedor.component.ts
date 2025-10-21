import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CompraResponseDTO } from '../../../core/models/compra-models/compraResponseDTO.interface';
import { CompraService } from '../../../core/services/compra-service/compra.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compras-historial-by-proveedor',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressBar,
    MatDialogContent,
    CommonModule
],
  templateUrl: './compras-historial-by-proveedor.component.html',
  styleUrl: './compras-historial-by-proveedor.component.scss'
})
export class ComprasHistorialByProveedorComponent implements OnInit{

  private dialog = inject(MatDialogRef<ComprasHistorialByProveedorComponent>)
  private compraService = inject(CompraService);
  
  idProveedor!: number;
  nombreComercial!: string
  isLoading = true;

  public compras: CompraResponseDTO[] = [];

  constructor (@Inject(MAT_DIALOG_DATA) private data: {idProveedor: number; nombreComercial: string}){}

  ngOnInit(): void {
    this.idProveedor = this.data.idProveedor;
    this.nombreComercial = this.data.nombreComercial;

    this.cargarComprasByProveedor(this.idProveedor);
  }

  // Metodo para cargar todas las compras hechas por un proveedor
  private cargarComprasByProveedor(idProveedor: number){
    this.compraService.getAllComprasByProveedor(idProveedor)
      .subscribe({
        next: (data) => {
          this.compras = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  // Metodo para cerrar el dialog
  public closeModal(){
    this.dialog.close();
  }
}