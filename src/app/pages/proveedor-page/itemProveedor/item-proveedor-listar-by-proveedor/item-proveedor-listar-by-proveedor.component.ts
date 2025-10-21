import { Component, inject, Inject, Injectable, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from '../../../../core/services/proveedor-service/proveedor.service';
import { ItemProveedorListarDTO } from '../../../../core/models/proveedor-models/itemProveedor/itemProveedorListarDTO.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { ItemProveedorCambiarNombreComponent } from '../item-proveedor-cambiar-nombre/item-proveedor-cambiar-nombre.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemProveedorResponseDTO } from '../../../../core/models/proveedor-models/itemProveedor/itemProveedorResponseDTO.interface';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-item-proveedor-listar-by-proveedor',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogContent,
    CommonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatDialogActions
],
  templateUrl: './item-proveedor-listar-by-proveedor.component.html',
  styleUrl: './item-proveedor-listar-by-proveedor.component.scss'
})
export class ItemProveedorListarByProveedorComponent implements OnInit{

  // Variables
  private dialogOpen = inject(MatDialog);
  private dialog = inject(MatDialogRef<ItemProveedorListarByProveedorComponent>);
  private proveedorService = inject(ProveedorService);

  itemsProveedor: ItemProveedorListarDTO[] = [];
  idProveedor!: number;

  // Variables para cargar la interfaz de cargado
  isLoadingResult = false;
  isRateLimitReached = false;

  constructor (@Inject(MAT_DIALOG_DATA) private data: { idProveedor: number } ) {}

  // logica que iniciara junto con el componente
  ngOnInit(): void {
    this.idProveedor = this.data.idProveedor;
    this.cargarItemProveedor();
  }

  // Metodo para cargar a los items proveedor desde el servicio
  cargarItemProveedor(){
    
    this.isLoadingResult = true;
    this.isRateLimitReached = false;
    
    this.proveedorService.getAllItemProveedorByIdProveedor(this.idProveedor).subscribe({
      next: (response) => {
        this.itemsProveedor = response;
        this.isLoadingResult = false;
        this.isRateLimitReached = false;
      },
      error: (err) => {
        console.log("Error al obtener items", err)
        this.isLoadingResult = true;
        this.isRateLimitReached = false;
      }
    })
  }  

  // Metodo para abrir el componente para editar el nombre del item
  onModalCambiarNombreItem(data: { idItemProveedor: number, nombreItemProveedor: string}){
    const dialogRef = this.dialogOpen.open(ItemProveedorCambiarNombreComponent, {
      width: '35vw',
      maxWidth: '35vw',
      data: { 
        idItemProveedor: data.idItemProveedor,
        nombreItemProveedor: data.nombreItemProveedor
      }
    })

    dialogRef
      .afterClosed()
      .subscribe((result: ItemProveedorResponseDTO | undefined) => {
        this.cargarItemProveedor();
      })
  }

  // Metodo para cerrar la ventana modal
  closeModal(){
    this.dialog.close()
  }
}