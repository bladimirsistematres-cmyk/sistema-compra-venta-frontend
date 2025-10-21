import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CompraService } from '../../../core/services/compra-service/compra.service';
import { CompraResponseDTO } from '../../../core/models/compra-models/compraResponseDTO.interface';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compras-by-materia-prima',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBar,
    MatDialogContent,
    MatCardModule,
    CommonModule
],
  templateUrl: './compras-by-materia-prima.component.html',
  styleUrl: './compras-by-materia-prima.component.scss'
})
export class ComprasByMateriaPrimaComponent implements OnInit{

  private dialog = inject(MatDialogRef<ComprasByMateriaPrimaComponent>)
  private compraService = inject(CompraService);

  public comprasMateriasPrimas: CompraResponseDTO[] = []
  public idMateriaPrima!: number;
  public nombreMateriaPrima!: string;
  public isLoading = true;

  constructor (@Inject(MAT_DIALOG_DATA) private data: {idMateriaPrima: number; materiaPrima: string}){}

  ngOnInit(): void {
    this.idMateriaPrima = this.data.idMateriaPrima;
    this.nombreMateriaPrima = this.data.materiaPrima;
    this.cargarComprarMateriaPrima(this.idMateriaPrima);
  }

  // Metodo para cargar compras realizadas de una materia prima
  private cargarComprarMateriaPrima(idMateriaPrima: number){
    
    this.isLoading = true;

    this.compraService.getAllComprasByMateriaPrima(idMateriaPrima)
      .subscribe({
        next: (data) => {
          this.comprasMateriasPrimas = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      })
  }

  // Metodo para cerrar el modal
  public closeModal(){
    this.dialog.close()
  }
}