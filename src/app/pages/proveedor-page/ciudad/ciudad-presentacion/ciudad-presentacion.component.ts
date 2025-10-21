import { Component, inject, OnInit } from '@angular/core';
import { CiudadListarComponent } from '../ciudad-listar/ciudad-listar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ProveedorService } from '../../../../core/services/proveedor-service/proveedor.service';
import { CiudadResponseDTO } from '../../../../core/models/proveedor-models/ciudad/ciudadResponseDTO.interface';
import { ProgressAnimationComponent } from '../../../../core/animation/progress-animation/progress-animation.component';
import { MatDialog } from '@angular/material/dialog';
import { CiudadGuardarComponent } from '../ciudad-guardar/ciudad-guardar.component';
import { SnackbarService } from '../../../../core/services/animation-service/snackbar.service';

@Component({
  selector: 'app-ciudad-presentacion',
  imports: [CiudadListarComponent, MatButtonModule, MatIconModule, MatTooltipModule, ProgressAnimationComponent],
  templateUrl: './ciudad-presentacion.component.html',
  styleUrl: './ciudad-presentacion.component.scss'
})
export class CiudadPresentacionComponent implements OnInit{

  private proveedorService = inject(ProveedorService);
  private dialog = inject(MatDialog);

  ciudades: CiudadResponseDTO[] = []
  paginaActual = 0;
  totalPaginas = 0;
  totalElementos = 0;
  tamanioPagina = 4;

  cargando = true;

  ngOnInit(): void {
    this.cargarCiudades()
  }

  //Método para cargar las ciudades
  cargarCiudades(){

    this.cargando = true;

    this.proveedorService.getAllCiudades(true, this.paginaActual, this.tamanioPagina).subscribe({
      next: (data) => {
        this.ciudades = data.ciudades;
        this.paginaActual = data.paginaActual;
        this.totalPaginas = data.totalPaginas;
        this.totalElementos = data.totalEmentos;
        this.tamanioPagina = data.tamanioPagina;
        this.cargando = false;
      },
      error: (err) => {
        console.log(err);
        this.cargando = false;
      }
    })
  }

  //Recibir evento de la paginación
  onPaginaCambiada(event: { pageIndex: number, pageSize: number }){
    this.paginaActual = event.pageIndex;
    this.tamanioPagina = event.pageSize;
    this.cargarCiudades()
  }

  //Recibir id de la ciudad editar
  onEditarCiudad(idCiudad: number){
    this.openCiudadModalSave(idCiudad);
  }

  //Método para guardar la ciudad
  openCiudadModalSave(idCiudad?: number, soloLectura = false){
    const dialogRef = this.dialog.open(CiudadGuardarComponent, {
      width: '80vw',
      maxWidth: '55vw',
      disableClose: true,
      data: {idCiudad, soloLectura}
    })

    dialogRef.afterClosed().subscribe((result: 'success' | 'update') => {
      if (result == 'success'){
        this.cargarCiudades()
      }
      if(result == 'update'){
        this.cargarCiudades()
      }
    })  
  }
}
