import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProveedorService } from '../../../../core/services/proveedor-service/proveedor.service';
import { ProveedorResponseDTO } from '../../../../core/models/proveedor-models/proveedor/proveedorResponseDTO.interface';
import { CommonModule } from '@angular/common';
import { RepresentanteResponseDTO } from '../../../../core/models/proveedor-models/representante/representanteResponseDTO.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-proveedor-detalles',
  imports: [
    MatDialogContent,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
    MatDialogActions,
    MatProgressSpinnerModule,
  ],
  templateUrl: './proveedor-detalles.component.html',
  styleUrl: './proveedor-detalles.component.scss',
})
export class ProveedorDetallesComponent implements OnInit {
  private dialog = inject(MatDialogRef<ProveedorDetallesComponent>);
  private proveedorService = inject(ProveedorService);

  proveedor?: ProveedorResponseDTO;
  representantes: RepresentanteResponseDTO[] = [];

  isLoading = true;

  constructor(@Inject(MAT_DIALOG_DATA) private data: { idProveedor: number }) {}

  ngOnInit(): void {
    this.cargarProveedor();
    this.cargarRepresentantes();
  }

  // Metodo para cargar el proveedor
  cargarProveedor() {
    const idProveedor = this.data.idProveedor;
    this.proveedorService.getProveedorById(idProveedor).subscribe({
      next: (data) => {
        this.proveedor = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(`Error al cargar el proveedor: ${err}`);
      },
    });
  }

  // Metodo para cargar los representantes
  cargarRepresentantes() {
    this.proveedorService
      .getRepresentantesByProveedor(this.data.idProveedor)
      .subscribe({
        next: (data) => (this.representantes = data),
        error: (err) =>
          console.log(`Error al cargar de los representantes: ${err}`),
      });
  }

  // Cerrar Modal
  closeModal() {
    this.dialog.close();
  }
}
