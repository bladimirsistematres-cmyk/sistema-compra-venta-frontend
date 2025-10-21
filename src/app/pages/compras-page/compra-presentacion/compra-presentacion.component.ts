import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CompraListarTableComponent } from '../compra-listar-table/compra-listar-table.component';
import { ProgressAnimationComponent } from '../../../core/animation/progress-animation/progress-animation.component';
import { CompraService } from '../../../core/services/compra-service/compra.service';
import { CompraListarDTO } from '../../../core/models/compra-models/compraListarDTO.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { map } from 'rxjs';
import { CompraListarCardComponent } from '../compra-listar-card/compra-listar-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { CompraBottomSheetComponent } from '../compra-bottom-sheet/compra-bottom-sheet.component';

@Component({
  selector: 'app-compra-presentacion',
  imports: [
    MatButtonModule,
    CompraListarTableComponent,
    ProgressAnimationComponent,
    CompraListarCardComponent
  ],
  templateUrl: './compra-presentacion.component.html',
  styleUrl: './compra-presentacion.component.scss'
})
export class CompraPresentacionComponent implements OnInit{

  // Variables 
  private compraService = inject(CompraService)
  private breakpointerObserver = inject(BreakpointObserver);
  private bottomSheet = inject(MatBottomSheet);
  private isMovile$ = this.breakpointerObserver.observe(Breakpoints.HandsetPortrait).pipe(
    map(result => result.matches)
  );

  public isMobile = toSignal(this.isMovile$, {initialValue: false});
  public compras: CompraListarDTO[] = []
  public cargando = false;
  public isCargando = false;
  public errorConexion = false;

  public paginaActual = 0;
  public totalPaginas = 0;
  public totalElementos = 0;
  public tamanioPagina = 5;

  ngOnInit(): void {
    this.cargarCompras();
  }

  // Metodo para abrir el bottom sheet
  onOpenOptionCompra(compra: CompraListarDTO){
    const isMovile = this.isMovile$;

    if(isMovile){
      const ref = this.bottomSheet.open(CompraBottomSheetComponent, {
        data: {idCompra: compra.idCompra}
      })

      ref
        .afterDismissed()
        .subscribe(result => {
          if (result?.accion === 'REFRESCAR') this.cargarCompras()
        })
    }
  }

  // Metodo para cargar todas las cargas
  private cargarCompras(){
    this.isCargando = true;
    this.errorConexion = false;
    this.cargando = true;

    this.compraService
      .getAllCompras(this.paginaActual, this.tamanioPagina)
      .subscribe({
        next: (data) => {
          this.compras = data.listaCompra;
          this.paginaActual = data.paginaActual;
          this.totalElementos = data.totalElementos;
          this.tamanioPagina = data.tamanioPagina;
          this.totalPaginas = data.totalPaginas;
          this.cargando = false;
          this.isCargando = false;
        },
        error: (err) => {
          console.log(`Error al cargar las compras: `, err)
          this.errorConexion = true;
          this.isCargando = false;
        }
      })
  }

  cargarMasCompras(){
    if((this.paginaActual + 1) >= this.totalPaginas) return;

    this.isCargando = true;

    this.compraService
      .getAllCompras(this.paginaActual + 1, this.tamanioPagina)
      .subscribe({
        next: (data) => {
          this.compras = [...this.compras, ...data.listaCompra];
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