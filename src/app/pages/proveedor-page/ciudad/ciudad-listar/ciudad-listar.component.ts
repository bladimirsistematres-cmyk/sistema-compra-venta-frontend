import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CiudadResponseDTO } from '../../../../core/models/proveedor-models/ciudad/ciudadResponseDTO.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-ciudad-listar',
  imports: [MatTableModule, MatButtonModule, MatTooltipModule, MatIconModule, MatPaginatorModule],
  templateUrl: './ciudad-listar.component.html',
  styleUrl: './ciudad-listar.component.scss'
})
export class CiudadListarComponent implements OnChanges, AfterViewInit{
  

  @Input() totalElementos: number = 0;
  @Input() paginaActual: number = 0;
  @Input() tamanioPagina: number = 4;
  @Input() ciudades: CiudadResponseDTO[] = [];
  
  @Output() paginaCambiada = new EventEmitter<{ pageIndex: number, pageSize: number }>

  //Enviar id para la edicion de una ciudad
  @Output() editarCiudad = new EventEmitter<number>();
  
  dataSource!: MatTableDataSource<CiudadResponseDTO> 
  columns: string[] = ['idCiudad', 'nombreCiudad', 'nombrePais', 'estadoCiudad', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.paginator.pageIndex = this.paginaActual;
    this.paginator.pageSize = this.tamanioPagina;
    this.paginator.length = this.totalElementos;

    this.paginator.page.subscribe(event => {
      this.paginaCambiada.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize })
    })
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.ciudades);
  }
}