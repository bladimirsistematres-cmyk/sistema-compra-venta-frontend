import { Component, Input } from '@angular/core';
import { PaisListarDTO } from '../../../../core/models/proveedor-models/pais/paisListarDTO.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pais-listar',
  imports: [MatProgressSpinnerModule, MatCardModule, MatIconModule, MatTooltipModule, MatButtonModule],
  templateUrl: './pais-listar.component.html',
  styleUrl: './pais-listar.component.scss'
})
export class PaisListarComponent {

  @Input() paises: PaisListarDTO[] = [];
  @Input() isLoadingResult = false;
  @Input() isRateLimitReached = false;
}