import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackbar = inject(MatSnackBar)

  //Servicio para abrir el snackbar
  openSnackbar(message: string){
    this.snackbar.open(message, 'Cerrar', {
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
