import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Usuario } from '../../../core/models/usuario-models/usuario.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-usuario-listar-tabla',
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './usuario-listar-tabla.component.html',
  styleUrl: './usuario-listar-tabla.component.scss'
})
export class UsuarioListarTablaComponent implements OnChanges, AfterViewInit{

  @Input() isLoadingResult = false;
  @Input() isRateLimitReached = false;
  @Input() usuarios: Usuario[] = [];

  @Output() editarUsuario = new EventEmitter<number>();
  @Output() editarNombreUsuario = new EventEmitter<{id_usuario: number, nombreUsuario: string}>();
  @Output() editarPassword = new EventEmitter<number>();

  dataSource!: MatTableDataSource<Usuario>
  columns: string[] = ['id_usuario', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'role', 'acciones'];

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.usuarios);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    
  }
}