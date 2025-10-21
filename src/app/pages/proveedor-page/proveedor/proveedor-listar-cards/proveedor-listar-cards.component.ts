import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProveedorListarDTO } from '../../../../core/models/proveedor-models/proveedor/proveedorListarDTO.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProveedorBottomSheetComponent } from '../proveedor-bottom-sheet/proveedor-bottom-sheet.component';

@Component({
  selector: 'app-proveedor-listar-cards',
  imports: [
    MatProgressSpinnerModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    CommonModule, 
    MatTooltipModule, 
    MatDividerModule
  ],
  templateUrl: './proveedor-listar-cards.component.html',
  styleUrl: './proveedor-listar-cards.component.scss'
})
export class ProveedorListarCardsComponent {

  private bottomSheet = inject(MatBottomSheet)

  @Input() proveedores: ProveedorListarDTO[] = [];
  @Input() isLoadingResult = false;
  @Input() isRateLimitReached = false;

  @Output() refrescar = new EventEmitter<ProveedorListarDTO>();

  // Metodo para abrir el bottom sheet
  openBottomSheet(proveedor: ProveedorListarDTO): void{
    this.refrescar.emit(proveedor)
  }
}