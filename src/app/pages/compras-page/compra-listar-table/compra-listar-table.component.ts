import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CompraListarDTO } from '../../../core/models/compra-models/compraListarDTO.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-compra-listar-table',
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './compra-listar-table.component.html',
  styleUrl: './compra-listar-table.component.scss'
})
export class CompraListarTableComponent implements OnChanges, AfterViewInit{

  @Input() isLoadingResult = false;
  @Input() isRateLimitReached = false;
  @Input() compras: CompraListarDTO[] = [];
  @Input() totalElementos: number = 0;
  @Input() paginaActual: number = 0;
  @Input() tamanioPagina: number = 5;

  @Output() paginaCambiada = new EventEmitter<{ pageIndex: number, pageSize: number }>();

  dataSource!: MatTableDataSource<CompraListarDTO>
  columns: string[] = ['idCompra', 'totalCompra', 'nombreComercial', 'nombreMateriaPrima', 'unidadMedida', 'cantidadUnidadMedida']

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.compras)
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.paginator.pageIndex = this.paginaActual;
    this.paginator.pageSize = this.tamanioPagina;
    this.paginator.length = this.totalElementos;

    this.paginator
      .page
      .subscribe(event => {
        this.paginaCambiada.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize })
      })
  }
}