import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MateriaPrimaListarDTO } from '../../../core/models/materia-prima/materiaPrimaListarDTO.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-materia-prima-listar-tabla',
  imports: [
    MatProgressSpinnerModule, 
    MatTableModule, 
    MatButtonModule, 
    MatTooltipModule, 
    MatIconModule, 
    MatPaginatorModule, 
    CommonModule, 
    MatInputModule, 
    MatMenuModule, 
    MatDividerModule, 
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  templateUrl: './materia-prima-listar-tabla.component.html',
  styleUrl: './materia-prima-listar-tabla.component.scss'
})
export class MateriaPrimaListarTablaComponent implements OnChanges, AfterViewInit{

  @Input() isLoadingResult = false;
  @Input() isRateLimitReached = false;
  @Input() materiaPrima: MateriaPrimaListarDTO[] = [];
  @Input() totalElementos: number = 0;
  @Input() paginaActual: number = 0;
  @Input() tamanioPagina: number = 5;

  @Output() paginaCambiada = new EventEmitter<{ pageIndex: number, pageSize: number }>();
  @Output() getAllComprasByMateriaPrima = new EventEmitter<{idMateriaPrima: number, materiaPrima: string}>();

  dataSource!: MatTableDataSource<MateriaPrimaListarDTO>
  columns: string[] = ['idMateriaPrima', 'nombreMateriaPrima', 'stockActual', 'acciones'];

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.materiaPrima)
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.paginator.pageIndex = this.paginaActual;
    this.paginator.pageSize = this.tamanioPagina;
    this.paginator.length = this.totalElementos;

    this.paginator.page.subscribe(event => {
      this.paginaCambiada.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize })
    })
  }
}