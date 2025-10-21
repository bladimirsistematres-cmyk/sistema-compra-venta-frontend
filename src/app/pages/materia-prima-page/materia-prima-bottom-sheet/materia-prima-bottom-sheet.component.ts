import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MateriaPrimaComprarComponent } from '../materia-prima-comprar/materia-prima-comprar.component';
import { ComprasByMateriaPrimaComponent } from '../../compras-page/compras-by-materia-prima/compras-by-materia-prima.component';

@Component({
  selector: 'app-materia-prima-bottom-sheet',
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule
  ],
  templateUrl: './materia-prima-bottom-sheet.component.html',
  styleUrl: './materia-prima-bottom-sheet.component.scss'
})
export class MateriaPrimaBottomSheetComponent implements OnInit{

  private dialog = inject(MatDialog);

  nombreMateriaPrima!: string;

  constructor(
    private bottomSheet: MatBottomSheetRef<MateriaPrimaBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: {idMateriaPrima: number, nombreMateriaPrima: string}
  ){}

  ngOnInit(): void {
    this.nombreMateriaPrima = this.data.nombreMateriaPrima;
  }

  // Metodo para ver las compras realizadas de una materia prima
  onViewComprasHistory(){
    const dialogRef = this.dialog.open(ComprasByMateriaPrimaComponent, {
      width: '80vw',
      disableClose: true,
      data: {
        idMateriaPrima: this.data.idMateriaPrima,
        materiaPrima: this.data.nombreMateriaPrima
      }
    })
  }
}