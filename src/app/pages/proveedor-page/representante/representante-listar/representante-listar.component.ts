import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { RepresentanteResponseDTO } from '../../../../core/models/proveedor-models/representante/representanteResponseDTO.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-representante-listar',
  imports: [MatTableModule, MatButtonModule, MatTooltipModule, MatIconModule, MatPaginatorModule, CommonModule, MatInputModule, MatProgressSpinnerModule, MatMenuModule],
  templateUrl: './representante-listar.component.html',
  styleUrl: './representante-listar.component.scss'
})
export class RepresentanteListarComponent implements OnChanges, AfterViewInit{

  @Input() representantes: RepresentanteResponseDTO[] = []; 
  @Input() totalElementos: number = 0;
  @Input() paginaActual: number = 0;
  @Input() tamanioPagina: number = 5;
  @Input() isLoadingResult = false;
  @Input() isRateLimitReached = false;

  @Output() paginaCambiada = new EventEmitter<{ pageIndex: number, pageSize: number }>();
  @Output() editarRepresentante = new EventEmitter<number>();

  dataSource!: MatTableDataSource<RepresentanteResponseDTO>
  columns: string[] = ['idRepresentante', 'nombre', 'cargo', 'cedulaIdentidad', 'generoRepresentante', 'nombreComercial', 'fechaCreacion', 'acciones']

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.representantes);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.paginator.pageIndex = this.paginaActual;
    this.paginator.pageSize = this.tamanioPagina;
    this.paginator.length = this.totalElementos;

    this.paginator.page.subscribe(event => {
      this.paginaCambiada.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize });
    })
  }
}