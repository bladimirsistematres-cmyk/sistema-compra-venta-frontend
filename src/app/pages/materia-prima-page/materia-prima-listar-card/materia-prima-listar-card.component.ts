import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MateriaPrimaListarDTO } from '../../../core/models/materia-prima/materiaPrimaListarDTO.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-materia-prima-listar-card',
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatDividerModule
],
  templateUrl: './materia-prima-listar-card.component.html',
  styleUrl: './materia-prima-listar-card.component.scss'
})
export class MateriaPrimaListarCardComponent {

  @Input() materiaPrima: MateriaPrimaListarDTO[] = []
  @Input() isLoadingResult = false;
  @Input() isRateLimitReached = false;

  @Output() refrescar = new EventEmitter<MateriaPrimaListarDTO>();

  // Metodo para abrir el bottom sheet
  openBottomSheet(materiaPrima: MateriaPrimaListarDTO): void{
    this.refrescar.emit(materiaPrima)
  }
}