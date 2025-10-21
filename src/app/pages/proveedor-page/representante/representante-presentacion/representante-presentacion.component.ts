import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { RepresentanteListarComponent } from "../representante-listar/representante-listar.component";
import { ProgressAnimationComponent } from '../../../../core/animation/progress-animation/progress-animation.component';
import { MatDialog } from '@angular/material/dialog';
import { RepresentanteGuardarComponent } from '../representante-guardar/representante-guardar.component';
import { ProveedorService } from '../../../../core/services/proveedor-service/proveedor.service';
import { RepresentanteResponseDTO } from '../../../../core/models/proveedor-models/representante/representanteResponseDTO.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RepresentanteFiltrarComponent } from '../representante-filtrar/representante-filtrar.component';

@Component({
  selector: 'app-representante-presentacion',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, RepresentanteListarComponent, ProgressAnimationComponent, MatFormFieldModule, MatInputModule, FormsModule, RepresentanteFiltrarComponent],
  templateUrl: './representante-presentacion.component.html',
  styleUrl: './representante-presentacion.component.scss'
})
export class RepresentantePresentacionComponent implements OnInit {

  private dialog = inject(MatDialog);
  private proveedorService = inject(ProveedorService);

  isLoadingResult = false;
  isRateLimitReached = false;
  
  isCargando = false;
  errorConexion = false;
  
  representantes: RepresentanteResponseDTO[] = [];
  paginaActual = 0;
  totalPaginas = 0;
  totalElementos = 0; 
  tamanioPagina = 5;


  cargando = true

  searchTerm: string = '';

  ngOnInit(): void {
    this.cargarRepresentantes();
  }

  //Recibir evento de la paginación
  onPaginaCambiada(event: { pageIndex: number, pageSize: number }) {
    this.paginaActual = event.pageIndex;
    this.tamanioPagina = event.pageSize;

    if(this.searchTerm.length > 0){
      this.filtrarRepresentantes()
    }else{
      this.cargarRepresentantes();
    }

  }

  //Metodo para recibir el id del representante a editar
  onEditarRepresentante(idRepresenntante: number){
    this.openRepresentanteModalSave(idRepresenntante);
  }

  //Método para recibir el evento de filtrar
  onFiltrar(termino: string){
    this.searchTerm = termino;
    this.paginaActual = 0;
    this.filtrarRepresentantes();
  }

  //Método para abrir el modal de guardar representante
  openRepresentanteModalSave(idRepresentante?: number) {
    const dialogRef = this.dialog.open(RepresentanteGuardarComponent, {
      width: '80vw',
      maxWidth: '70vw',
      disableClose: true,
      data: {idRepresentante}
    })

    dialogRef.afterClosed().subscribe((result: 'success' | 'update') => {
      if (result === 'success'){
        this.cargarRepresentantes();
      }
      if(result === 'update'){
        this.cargarRepresentantes();
      }
    })
  }

  //Método para realizar filtraciones de los representantes
  filtrarRepresentantes() {
    
    this.isCargando = true;
    this.errorConexion = false;
    
    this.proveedorService.getRepresentanteByFilter(
      this.searchTerm,
      this.searchTerm,
      this.searchTerm,
      this.searchTerm,
      this.paginaActual,
      this.tamanioPagina
    ).subscribe({
      next: (data) => {
        this.representantes = data.representantes;
        this.paginaActual = data.paginaActual;
        this.totalElementos = data.totalElementos;
        this.tamanioPagina = data.tamanioPagina;
        this.isCargando = false;
      },
      error: (err) => {
        console.log(`Error al filtrar representantes: ${err}`);
        this.isCargando = false;
        this.errorConexion = true;
      }
    });
  }


  //Cargar los representantes
  cargarRepresentantes(){
    
    this.isCargando = true;
    this.errorConexion = false;

    this.cargando = true;

    this.proveedorService.getAllRepresentantes(this.paginaActual, this.tamanioPagina).subscribe({
      next: (data) => {
        this.representantes = data.representantes;
        this.paginaActual = data.paginaActual;
        this.totalElementos = data.totalElementos;
        this.tamanioPagina = data.tamanioPagina;
        this.cargando = false;
        this.isCargando = false;
      },
      error: (error) => {
        console.error('Error al cargar los representantes:', error);
        this.cargando = false;
        this.errorConexion = true;
        this.isCargando = false;
      }
    })
  } 
}
