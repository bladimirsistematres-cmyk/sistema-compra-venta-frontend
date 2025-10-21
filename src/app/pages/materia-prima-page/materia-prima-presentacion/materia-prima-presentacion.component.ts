import { Component, inject, OnInit } from '@angular/core';
import { MateriaPrimaListarDTO } from '../../../core/models/materia-prima/materiaPrimaListarDTO.interface';
import { MateriaPrimaService } from '../../../core/services/materia-prima-service/materia-prima.service';
import { ProgressAnimationComponent } from '../../../core/animation/progress-animation/progress-animation.component';
import { MateriaPrimaListarTablaComponent } from '../materia-prima-listar-tabla/materia-prima-listar-tabla.component';
import { MatDialog } from '@angular/material/dialog';
import { MateriaPrimaSaveComponent } from '../materia-prima-save/materia-prima-save.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MateriaPrimaResponseDTO } from '../../../core/models/materia-prima/materiaPrimaResponseDTO.interface';
import { ComprasByMateriaPrimaComponent } from '../../compras-page/compras-by-materia-prima/compras-by-materia-prima.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MateriaPrimaListarByProveedorComponent } from '../materia-prima-listar-by-proveedor/materia-prima-listar-by-proveedor.component';
import { MateriaPrimaListarCardComponent } from "../materia-prima-listar-card/materia-prima-listar-card.component";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MateriaPrimaBottomSheetComponent } from '../materia-prima-bottom-sheet/materia-prima-bottom-sheet.component';

@Component({
  selector: 'app-materia-prima-presentacion',
  imports: [
    ProgressAnimationComponent,
    MateriaPrimaListarTablaComponent,
    MatButtonModule, 
    MatIconModule,
    MatMenuModule,
    MateriaPrimaListarCardComponent,
    MatButtonToggleModule
],
  templateUrl: './materia-prima-presentacion.component.html',
  styleUrl: './materia-prima-presentacion.component.scss'
})
export class MateriaPrimaPresentacionComponent implements OnInit{

  // Variables 
  private materiaPrimaService = inject(MateriaPrimaService);
  private dialog = inject(MatDialog);
  private breakpointObserver = inject(BreakpointObserver);
  private bottomSheet = inject(MatBottomSheet);
  private isMovile$ = this.breakpointObserver.observe(Breakpoints.HandsetPortrait).pipe(
    map(result => result.matches)
  );

  public materiaPrima: MateriaPrimaListarDTO[] = []

  isMobile = toSignal(this.isMovile$, {initialValue: false});
  paginaActual = 0;
  totalPaginas = 0;
  totalElementos = 0;
  tamanioPagina = 5;

  public openMenuMateriaPrima = false;
  public isCargando = false
  public errorConexion = false
  public cargado = false

  ngOnInit(): void {
    this.cargarMateriaPrima()
  }

  // Metodo para abrir el bottom sheet
  onOpenOptionMateriaPrima(materiaPrima: MateriaPrimaListarDTO){
    const isMobile = this.isMovile$;

    if (isMobile){
      const ref = this.bottomSheet.open(MateriaPrimaBottomSheetComponent, {
        data: {idMateriaPrima: materiaPrima.idMateriaPrima, nombreMateriaPrima: materiaPrima.nombreMateriaPrima}
      })

      ref
        .afterDismissed()
        .subscribe(result => {
          if (result?.accion === 'REFRESCAR') this.cargarMateriaPrima()
        })
    }
  }

  // Metodo para recibir el cambio de pagina de la tabla
  onPaginaCambiada(event: { pageIndex: number; pageSize: number }) {
    this.paginaActual = event.pageIndex;
    this.tamanioPagina = event.pageSize;
    this.cargarMateriaPrima();
  }

  // Metodo para abrir el modal para listar las compras realizadas de una materia prima
  onGetAllCompraByMateriaPrima(data: {idMateriaPrima: number; materiaPrima: string}){
    const dialogRef = this.dialog.open(ComprasByMateriaPrimaComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true,
      data: {
        idMateriaPrima: data.idMateriaPrima,
        materiaPrima: data.materiaPrima
      },
    });
  }

  // Metodo para abrir el modal para registrar una nueva materia prima
  onSaveMateriaPrima(){
    const dialogRef = this.dialog.open(MateriaPrimaSaveComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true
    })

    dialogRef
      .afterClosed()
      .subscribe((result: MateriaPrimaResponseDTO | undefined) => {
        if (result) {
          this.cargarMateriaPrima()
        }
      })
  } 

  // Metodo para cargar materia prima
  cargarMateriaPrima(){
    this.isCargando = true;
    this.errorConexion = false;
    this.cargado = true;

    this.materiaPrimaService
      .gettAllMateriaPrima(this.paginaActual, this.tamanioPagina)
      .subscribe({
        next: (data) => {
          this.materiaPrima = data.materiaPrima;
          this.paginaActual = data.paginaActual;
          this.totalElementos = data.totalElementos;
          this.tamanioPagina = data.tamanioPagina;
          this.totalPaginas = data.totalPaginas;
          this.cargado = false;
          this.isCargando = false;
        },
        error: (err) => {
          console.error(`Error al cargar las materia prima: `, err)
          this.errorConexion = true;
          this.isCargando = false;
        }
      })
  }

  // Metodo para cargar materia prima (5 y 5)
  cargarMasMateriaPrima(){
    if((this.paginaActual + 1) >= this.totalPaginas) return;

    this.isCargando = true;

    this.materiaPrimaService
      .gettAllMateriaPrima(this.paginaActual + 1, this.tamanioPagina)
      .subscribe({
        next: (data) => {
          this.materiaPrima = [...this.materiaPrima, ...data.materiaPrima];
          this.paginaActual = data.paginaActual;
          this.totalPaginas = data.totalPaginas;
          this.isCargando = false;
        },
        error: () => {
          this.errorConexion = true;
          this.isCargando = false;
        }
      })
  }
}