import { Component, inject, OnInit } from '@angular/core';
import { PaisListarComponent } from '../pais-listar/pais-listar.component';
import { ProveedorService } from '../../../../core/services/proveedor-service/proveedor.service';
import { PaisListarDTO } from '../../../../core/models/proveedor-models/pais/paisListarDTO.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressAnimationComponent } from '../../../../core/animation/progress-animation/progress-animation.component';

@Component({
  selector: 'app-pais-presentacion',
  imports: [
    ProgressAnimationComponent,
    MatProgressSpinnerModule,
    PaisListarComponent
  ],
  templateUrl: './pais-presentacion.component.html',
  styleUrl: './pais-presentacion.component.scss'
})
export class PaisPresentacionComponent implements OnInit{

  private proveedorService = inject(ProveedorService);
  public cargado = false;
  public paises: PaisListarDTO[] = [];
  public isCargando = false;
  public errorConexion = false;


  // Metodo para cargar al iniciar el componente
  ngOnInit(): void {
    this.cargarPaises();
  }


  // Metodo para cargar todos los paises
  cargarPaises(){

    this.isCargando = true;
    this.errorConexion = false;
    this.cargado = true;

    this.proveedorService.getAllPaises()
      .subscribe({
        next: (data) => {
          this.isCargando = false;
          this.cargado = false;
          this.paises = data
        },
        error: (error) => {
          this.errorConexion = true;
          this.isCargando = false;
          console.log('error', error)
        }
      });
  }
}