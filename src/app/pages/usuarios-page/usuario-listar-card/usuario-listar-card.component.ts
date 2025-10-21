import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../core/models/usuario-models/usuario.interface';
import { MatProgressSpinner, MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-listar-card',
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatDividerModule,
    CommonModule
  ],
  templateUrl: './usuario-listar-card.component.html',
  styleUrl: './usuario-listar-card.component.scss'
})
export class UsuarioListarCardComponent {

  @Input() usuarios: Usuario[] = [];
  @Input() isLoadingResult = false;
  @Input() isRateLimitReached = false;

  @Output() refrescar = new EventEmitter<Usuario>();

  // Metodo para abrir el bottom sheet
  openBottomSheet(usuario: Usuario): void{
    this.refrescar.emit(usuario);
  }
}