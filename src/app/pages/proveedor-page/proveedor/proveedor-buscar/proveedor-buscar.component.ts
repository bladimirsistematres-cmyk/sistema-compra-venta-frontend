import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-proveedor-buscar',
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './proveedor-buscar.component.html',
  styleUrl: './proveedor-buscar.component.scss'
})
export class ProveedorBuscarComponent {
}