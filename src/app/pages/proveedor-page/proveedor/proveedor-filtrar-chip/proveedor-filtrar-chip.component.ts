import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-proveedor-filtrar-chip',
  imports: [MatChipsModule],
  templateUrl: './proveedor-filtrar-chip.component.html',
  styleUrl: './proveedor-filtrar-chip.component.scss'
})
export class ProveedorFiltrarChipComponent {
  openAlert(){
    alert("Hola Mundo")
  }
}