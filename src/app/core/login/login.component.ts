import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthenticationService } from '../services/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertCredencialesComponent } from '../../pages/alert-page/alert-credenciales/alert-credenciales.component';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authenticationService = inject(AuthenticationService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private fb= inject(FormBuilder);

  isLoading = false;

  formLogin: FormGroup = this.fb.group({
    nombreUsuario: ['', [Validators.required, Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.maxLength(8)]]
  });

  //Método para iniciar sesión en el sistema
  loginUser(){
    if (!this.formLogin.value){
      console.log('Datos Incompletos')
      return;
    }

    this.isLoading = true;

    this.authenticationService.authenticationUsuario(this.formLogin.value)
      .subscribe({
        next: (data) => {
          this.isLoading = true;
          this.formLogin.reset();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          this.dialog.open(AlertCredencialesComponent, {
            
          })
        }
      })
  }
}