import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ProveedorListarComponent } from '../proveedor-listar/proveedor-listar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProgressAnimationComponent } from '../../../../core/animation/progress-animation/progress-animation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ProveedorService } from '../../../../core/services/proveedor-service/proveedor.service';
import { ProveedorResponseDTO } from '../../../../core/models/proveedor-models/proveedor/proveedorResponseDTO.interface';
import { ProveedorGuardarComponent } from '../proveedor-guardar/proveedor-guardar.component';
import { ProveedorDetallesComponent } from '../proveedor-detalles/proveedor-detalles.component';
import { RepresentanteResponseDTO } from '../../../../core/models/proveedor-models/representante/representanteResponseDTO.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProveedorListarDTO } from '../../../../core/models/proveedor-models/proveedor/proveedorListarDTO.interface';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ItemProveedorGuardarComponent } from '../../itemProveedor/item-proveedor-guardar/item-proveedor-guardar.component';
import { ItemProveedorListarByProveedorComponent } from '../../itemProveedor/item-proveedor-listar-by-proveedor/item-proveedor-listar-by-proveedor.component';
import { ProveedorCambiarNombreComponent } from '../proveedor-cambiar-nombre/proveedor-cambiar-nombre.component';
import { RepresentanteGuardarComponent } from '../../representante/representante-guardar/representante-guardar.component';
import { RepresentanteListarProveedorComponent } from '../../representante/representante-listar-proveedor/representante-listar-proveedor.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProveedorListarCardsComponent } from '../proveedor-listar-cards/proveedor-listar-cards.component';
import { MateriaPrimaSaveComponent } from '../../../materia-prima-page/materia-prima-save/materia-prima-save.component';
import { MateriaPrimaResponseDTO } from '../../../../core/models/materia-prima/materiaPrimaResponseDTO.interface';
import { MateriaPrimaListarByProveedorComponent } from '../../../materia-prima-page/materia-prima-listar-by-proveedor/materia-prima-listar-by-proveedor.component';
import { ComprasHistorialByProveedorComponent } from '../../../compras-page/compras-historial-by-proveedor/compras-historial-by-proveedor.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProveedorBottomSheetComponent } from '../proveedor-bottom-sheet/proveedor-bottom-sheet.component';

@Component({
  selector: 'app-proveedor-presentacion',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ProveedorListarComponent,
    ProgressAnimationComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonToggleModule,
    ProveedorListarCardsComponent
  ],
  templateUrl: './proveedor-presentacion.component.html',
  styleUrl: './proveedor-presentacion.component.scss',
})
export class ProveedorPresentacionComponent implements OnInit {
  private dialog = inject(MatDialog);
  private proveedorService = inject(ProveedorService);
  private breakpointObserver = inject(BreakpointObserver);
  private bottomSheet = inject(MatBottomSheet);
  private isMobile$ = this.breakpointObserver.observe(Breakpoints.HandsetPortrait).pipe(
    map(result => result.matches)
  );
  isMobile = toSignal(this.isMobile$, {initialValue: false})

  isLoadingResult = false;
  isRateLimitReached = false;

  isCargando = false;
  errorConexion = false;
  
  openMenuProveedor = false;
  proveedores: ProveedorListarDTO[] = [];
  paginaActual = 0;
  totalPaginas = 0;
  totalElementos = 0;
  tamanioPagina = 5;

  // procesandoLista = false;
  cargando = false;

  hasRepresentatives: boolean = false;
  representantes: RepresentanteResponseDTO[] = [];

  ngOnInit(): void {
    this.cargarProveedores();
  }

  // Abrir bottom shet para proveedor
  onOpenOptionProveedor(proveedor: ProveedorListarDTO){
    const isMobile = this.isMobile$;

    if (isMobile){
      const ref = this.bottomSheet.open(ProveedorBottomSheetComponent, {
        data: {idProveedor: proveedor.idProveedor, nombreComercial: proveedor.nombreComercial}
      });

      ref
        .afterDismissed()
        .subscribe(result => {
          if (result?.accion === 'REFRESCAR') this.cargarProveedores();
        })
    }
  }

  // Recibir evento de la paginación
  onPaginaCambiada(event: { pageIndex: number; pageSize: number }) {
    this.paginaActual = event.pageIndex;
    this.tamanioPagina = event.pageSize;
    this.cargarProveedores();
  }

  // Metodo para recibir el id del proveedor a editar
  onEditarProveedor(idProveedor: number) {
    this.openProveedorModalSave(idProveedor);
  }

  // Metodo para ver las compras hechas a un proveedor
  onGetAllComprasByProveedor(data: {idProveedor: number; nombreComercial: string}){
    const dialogRef = this.dialog.open(ComprasHistorialByProveedorComponent, {
      width: '80vw',
      maxWidth: '80vw',
      data: { 
        idProveedor: data.idProveedor,
        nombreComercial: data.nombreComercial
      }
    })
  }

  // Metodo para recibir el id del proveedor para ver sus detalles
  onDetallesProveedor(idProveedor: number) {
    const dialogRef = this.dialog.open(ProveedorDetallesComponent, {
      width: '80vw',
      maxWidth: '70vw',
      disableClose: true,
      data: { idProveedor },
    });
  }

  // Metodo para recibir el id del proveedor para listar a los representantes de un proveedor
  onGetAllRepresentantesByProveedor(data: {idProveedor: number; nombreComercial: string}){
    const dialogRef = this.dialog.open(RepresentanteListarProveedorComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true,
      data: { 
        idProveedor: data.idProveedor,
        nombreComercial: data.nombreComercial
       },
    });
  }

  // Metodo para abrir el modal para listar materia prima de un proveedor
  onGetAllMateriaPrimaByProveedor(data: {idProveedor: number; nombreComercial: string}){
    const dialogRef = this.dialog.open(MateriaPrimaListarByProveedorComponent, {
      width: '80vw', 
      maxWidth: '80vw',
      disableClose: true,
      data: { 
        idProveedor: data.idProveedor,
        nombreComercial: data.nombreComercial
       },
    });
  }

  onCreateMateriaPrima(data: {idProveedor: number; nombreComercial: string}){
    const dialogRef = this.dialog.open(MateriaPrimaSaveComponent, {
      width: '80vw', 
      maxWidth: '80vw',
      disableClose: true,
      data: {
        idProveedor: data.idProveedor,
        nombreComercial: data.nombreComercial
      }
    })

    dialogRef
      .afterClosed()
      .subscribe((result : MateriaPrimaResponseDTO | undefined) => {
        if (result){
          this.cargarProveedores();
        }
      })
  }

  // Metodo para recibir el id del proveedor para crear un item del proveedor (Eliminar)
  onCreateItemProveedor( data: {idProveedor: number; nombreComercial: string} ) {
    const dialogRef = this.dialog.open(ItemProveedorGuardarComponent, {
      width: '80vw',
      maxWidth: '70vw',
      disableClose: true,
      data: { 
        idProveedor: data.idProveedor,
        nombreComercial: data.nombreComercial
      }
    })

    dialogRef
      .afterClosed()
      .subscribe((result: ProveedorResponseDTO | undefined) => {
        if (result) {
          this.cargarProveedores()
        }
    })
  }

  // Metodo para listar a los items de un proveedor por id
  onGetItemProveedorByProveedor(idProveedor: number){
    const dialogRef = this.dialog.open(ItemProveedorListarByProveedorComponent, {
      width: '80vw',
      maxWidth: '70vw',
      disableClose: true,
      data: { idProveedor }
    })
  }

  // Metodo para cambiar el nombre del proveedor
  onChangeNameProveedor(data: {idProveedor: number; nombreComercial: string}){
    const dialogRef = this.dialog.open(ProveedorCambiarNombreComponent, {
      width: '80vw',
      maxWidth: '99vw',
      disableClose: true,
      data: { 
        idProveedor: data.idProveedor,
        nombreComercial: data.nombreComercial
      }
    })

    dialogRef
      .afterClosed()
      .subscribe((result: ProveedorResponseDTO | undefined) => {
        if (result) {
          this.cargarProveedores()
        }
    })
  }

  // Metodo para agregar un representante en el proveedor
  onNewRepresenanteForProveedor(data: {idProveedor: number; nombreComercial: string}){
    const dialogRef = this.dialog.open(RepresentanteGuardarComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true,
      data: { 
        idProveedor: data.idProveedor,
        nombreComercial: data.nombreComercial
      }
    })

    dialogRef
      .afterClosed()
      .subscribe((result: ProveedorResponseDTO | undefined) => {
        if (result) {
          this.cargarProveedores();
        }
    });
  }

  // Metodo para cambiar el valor del boton toggle
  onToggleChange(event: any){
    const selectdValue = event.value;

    if(selectdValue === 'list'){
      alert('Se selecciono la lista')
    }else if(selectdValue === 'grid'){
      alert('Se selecciono cuadricula')
    }
  }

  // Abrir modal para guardar proveedor
  openProveedorModalSave(idProveedor?: number) {
    const dialogRef = this.dialog.open(ProveedorGuardarComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true,
      data: { idProveedor },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: ProveedorResponseDTO | undefined) => {
        if (result) {
          this.cargarProveedores();
        }
      });
  }

  // Cargar proveedores
  cargarProveedores() {

    this.paginaActual = 0;
    this.isCargando = true
    this.errorConexion = false;
    this.cargando = true;

    this.proveedorService
      .getAllProveedoresNewVersion(this.paginaActual, this.tamanioPagina)
      .subscribe({
        next: (data) => {
          this.proveedores = [...data.proveedores];
          this.paginaActual = data.paginaActual;
          this.totalElementos = data.totalElementos;
          this.tamanioPagina = data.tamanioPagina;
          this.totalPaginas = data.totalPaginas
          this.cargando = false;
          this.isCargando = false;
        },
        error: (error) => {
          console.error('Error al cargar los representantes:', error);
          this.errorConexion = true;
          this.isCargando = false;
        },
      });
  }

  cargarMasProveedores() {
  // Si ya no hay más, no pidas nada
  if ((this.paginaActual + 1) >= this.totalPaginas) return;

  this.isCargando = true;

  this.proveedorService
    .getAllProveedoresNewVersion(this.paginaActual + 1, this.tamanioPagina)
    .subscribe({
      next: (data) => {
        this.proveedores = [...this.proveedores, ...data.proveedores];
        this.paginaActual = data.paginaActual;
        this.totalPaginas = data.totalPaginas;
        this.isCargando = false;
      },
      error: () => {
        this.errorConexion = true;
        this.isCargando = false;
      },
    });
  }
}
