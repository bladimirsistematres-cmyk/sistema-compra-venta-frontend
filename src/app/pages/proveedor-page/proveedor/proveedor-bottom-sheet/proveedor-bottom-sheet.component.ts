import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProveedorCambiarNombreComponent } from '../proveedor-cambiar-nombre/proveedor-cambiar-nombre.component';
import { ProveedorGuardarComponent } from '../proveedor-guardar/proveedor-guardar.component';
import { MateriaPrimaSaveComponent } from '../../../materia-prima-page/materia-prima-save/materia-prima-save.component';
import { MateriaPrimaListarByProveedorComponent } from '../../../materia-prima-page/materia-prima-listar-by-proveedor/materia-prima-listar-by-proveedor.component';
import { ComprasHistorialByProveedorComponent } from '../../../compras-page/compras-historial-by-proveedor/compras-historial-by-proveedor.component';
import { RepresentanteGuardarComponent } from '../../representante/representante-guardar/representante-guardar.component';
import { RepresentanteListarProveedorComponent } from '../../representante/representante-listar-proveedor/representante-listar-proveedor.component';
import { ProveedorDetallesComponent } from '../proveedor-detalles/proveedor-detalles.component';

@Component({
  selector: 'app-proveedor-bottom-sheet',
  imports: [
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatToolbarModule],
  templateUrl: './proveedor-bottom-sheet.component.html',
  styleUrl: './proveedor-bottom-sheet.component.scss'
})
export class ProveedorBottomSheetComponent implements OnInit{  

  private dialog = inject(MatDialog);

  nombreProveedor!: string;

  constructor(
    private bottomSheet: MatBottomSheetRef<ProveedorBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: { idProveedor: number, nombreComercial: string }) 
  {}

  ngOnInit(): void {
      this.nombreProveedor = this.data.nombreComercial;
  }

  // Metodo para cambiar el nombre del proveedor
  onChangeNameProveedor(){
    const dialgoRef = this.dialog.open(ProveedorCambiarNombreComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true,
      data: { 
        idProveedor: this.data.idProveedor,
        nombreComercial: this.data.nombreComercial
      }
    })

    dialgoRef.afterClosed().subscribe(result => {
      if(result?.exito){
        this.bottomSheet.dismiss({accion: 'REFRESCAR'})
      }
    })
  }
  
  // Metodo para editar el Proveedor
  onEditProveedor(){
    const dialogRef = this.dialog.open(ProveedorGuardarComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true,
      data: { idProveedor: this.data.idProveedor },
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result?.exito){
          this.bottomSheet.dismiss({accion: 'REFRESCAR'})
        } 
      })
  }

  // Metodo para agregar materia prima a un proveedor
  onMateriaPrimaSave(){
    const dialogRef = this.dialog.open(MateriaPrimaSaveComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true,
      data: { 
        idProveedor: this.data.idProveedor,
        nombreComercial: this.data.nombreComercial
      },
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result?.exito){
          this.bottomSheet.dismiss({accion: 'REFRESCAR'})
        }
      });
  }

  // Metodo para mostrar las materias primas de cada proveedor
  onGetAllMateriaPrimaByProveedor(){
    const dialogRef = this.dialog.open(MateriaPrimaListarByProveedorComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true,
      data: { 
        idProveedor: this.data.idProveedor ,
        nombreComercial: this.data.nombreComercial
      },
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if(result?.exito){
          this.bottomSheet.dismiss({accion: 'REFRESCAR'})
        }
      })
  }

  // Metodo para ver las compras realizadas a un proveedor
  onGetAllComprasByProveedor(){
    const dialogRef = this.dialog.open(ComprasHistorialByProveedorComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true,
      data: { 
        idProveedor: this.data.idProveedor,
        nombreComercial: this.data.nombreComercial
       },
    });

    dialogRef 
      .afterClosed()
      .subscribe(result => {
        if (result?.exito){
          this.bottomSheet.dismiss({accion: 'REFRESCAR'})
        }
      })
  }

  // Metodo para agregar un representante a un proveedor
  onRepresentanteSave(){
    const dialogRef = this.dialog.open(RepresentanteGuardarComponent, {
      width: '80vw', 
      maxWidth: '80vw',
      disableClose: true,
      data: {
        idProveedor: this.data.idProveedor,
        nombreComercial: this.data.nombreComercial
      },
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result?.exito){
          this.bottomSheet.dismiss({accion: 'REFRESCAR'})
        }
      })
  }

  // Metodo para listar todos los representantes de un proveedor
  onGetAllRepresentantesByProveedor(){
    const dialgoRef = this.dialog.open(RepresentanteListarProveedorComponent, {
      width: '80vw',
      maxWidth: '80vw',
      disableClose: true,
      data: {
        idProveedor: this.data.idProveedor,
        nombreComercial: this.data.nombreComercial
      },
    });

    dialgoRef 
      .afterClosed()
      .subscribe(result => {
        if(result?.exito){
          this.bottomSheet.dismiss({accion: 'REFRESCAR'});
        }
      })
  }

  // Metodo para mostrar la informacion del proveedor
  onViewInformationProveedor(){
    const dialogRef = this.dialog.open(ProveedorDetallesComponent, {
      width: '80vw',
      height: '80vh',
      disableClose: true,
      data: { idProveedor: this.data.idProveedor }
    })
  }
}