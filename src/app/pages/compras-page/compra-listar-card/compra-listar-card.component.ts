import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CompraListarDTO } from '../../../core/models/compra-models/compraListarDTO.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-compra-listar-card',
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './compra-listar-card.component.html',
  styleUrl: './compra-listar-card.component.scss'
})
export class CompraListarCardComponent {

  @Input() compras: CompraListarDTO[] = [];
  @Input() isLoadingResult = false;
  @Input() isRateLimitReached = false;

  @Output() refrescar = new EventEmitter<CompraListarDTO>();

  // Metodo para abrir el bottom sheet
  openBottomSheet(compra: CompraListarDTO): void{
    this.refrescar.emit(compra);
  }
}