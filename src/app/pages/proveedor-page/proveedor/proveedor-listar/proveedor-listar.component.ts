import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output , ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProveedorListarDTO } from '../../../../core/models/proveedor-models/proveedor/proveedorListarDTO.interface';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-proveedor-listar',
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatTooltipModule, 
    MatIconModule, 
    MatPaginatorModule, 
    CommonModule, 
    MatInputModule, 
    MatMenuModule, 
    MatDividerModule, 
    MatProgressSpinnerModule
  ],
  templateUrl: './proveedor-listar.component.html',
  styleUrl: './proveedor-listar.component.scss'
})
export class ProveedorListarComponent implements OnChanges, AfterViewInit{

  @Input() isLoadingResult = false;
  @Input() isRateLimitReached = false;
  @Input() proveedores: ProveedorListarDTO[] = []
  @Input() totalElementos: number = 0;
  @Input() paginaActual: number = 0;
  @Input() tamanioPagina: number = 4;

  @Output() paginaCambiada = new EventEmitter<{ pageIndex: number, pageSize: number }>();
  @Output() editarProveedor = new EventEmitter<number>();
  @Output() detallesProveedor = new EventEmitter<number>();
  @Output() crearMateriaPrima = new EventEmitter<{idProveedor: number; nombreComercial: string}>();
  @Output() getAllMateriaPrimaByProveedor = new EventEmitter<{idProveedor: number; nombreComercial: string}>();
  @Output() cambiarNombreProveedor = new EventEmitter<{idProveedor: number; nombreComercial: string}>();
  @Output() crearRepresentante = new EventEmitter<{idProveedor: number; nombreComercial: string}>();
  @Output() getAllRepresentantesByIdProveedor = new EventEmitter<{idProveedor: number; nombreComercial: string}>();
  @Output() getAllComprasByProveedor = new EventEmitter<{idProveedor: number; nombreComercial: string}>();
  @Output() scrollAlFinal = new EventEmitter<void>();

  dataSource!: MatTableDataSource<ProveedorListarDTO>
  columms: string[] = ['idProveedor', 'nombreComercial', 'identificacionFiscal', 'fechaCreacion', 'tipoProveedor' ,'representante', 'acciones']

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.proveedores)
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

  onScroll(event: any){
    const element = event.target;
    
    if(element.scrollHeight - element.scrollTop === element.clientHeight){
      this.scrollAlFinal.emit();
    }
  }
}