import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProveedorService } from '../../../../core/services/proveedor-service/proveedor.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CiudadResponseDTO } from '../../../../core/models/proveedor-models/ciudad/ciudadResponseDTO.interface';
import { CiudadDTO } from '../../../../core/models/proveedor-models/ciudad/ciudadDTO.interface';
import { SnackbarService } from '../../../../core/services/animation-service/snackbar.service';
import { Pais } from '../../../../core/models/proveedor-models/pais/pais.interface';

@Component({
  selector: 'app-ciudad-guardar',
  imports: [MatDialogActions, MatDialogClose, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ciudad-guardar.component.html',
  styleUrl: './ciudad-guardar.component.scss'
})
export class CiudadGuardarComponent implements OnInit{

  private proveedorService = inject(ProveedorService);
  private snackbarService = inject(SnackbarService)
  private fb = inject(FormBuilder)
  private dialogRef = inject(MatDialogRef<CiudadGuardarComponent>);

  formCiudad?: FormGroup
  ciudad?: CiudadResponseDTO;
  paises: Pais[] = []

  constructor(@Inject(MAT_DIALOG_DATA) private data: {idCiudad?: number, soloLectura?: boolean}) { 
    
    const idCiudad = this.data.idCiudad;

    if(idCiudad){
      this.proveedorService.getCiudadById(idCiudad).subscribe(ciudades => {
        this.ciudad = ciudades;
        this.formCiudad = this.fb.group({
          idCiudad: [ciudades.idCiudad, [Validators.required]],
          nombreCiudad: [ciudades.nombreCiudad, [Validators.required]],
          idPais: [ciudades.idPais, [Validators.required]],
          nombrePais: [ciudades.nombrePais, [Validators.required]]
        })
      })
    }

    this.formCiudad = this.fb.group({
      nombreCiudad: ['', [Validators.required]],
      idPais: [null, [Validators.required]]
    })
  }
  
  ngOnInit(): void {
    this.loadPaises();
  }

  //Método para cerrar la ventana modal
  closeModal(){
    this.dialogRef.close()
  }

  //Método para guardar la ciudad
  saveCiudad(){
    const formDTO: CiudadDTO = this.formCiudad!.value;

    if(this.ciudad){
      this.proveedorService.updateCiudad(this.ciudad.idCiudad, formDTO).subscribe({
        next: (data) => {
          this.snackbarService.openSnackbar('Ciudad Actualizada');
          this.dialogRef.close('update');
        },
        error: (err) => {
          console.log(`Error de Actualización: ${err}`);
        }
      })
    }else{
      this.proveedorService.createCiudad(formDTO).subscribe({
        next: (data) => {
          this.snackbarService.openSnackbar('Ciudad Creada');
          this.dialogRef.close('success');
        },
        error: (err) => {
          console.log(`Error de Creación: ${err}`)
        }
      })
    }
  }

  //Método para cargar los paises registrados
  loadPaises(){
    this.proveedorService.getAllPaises().subscribe(data => {
      this.paises = data;
    })
  }
}