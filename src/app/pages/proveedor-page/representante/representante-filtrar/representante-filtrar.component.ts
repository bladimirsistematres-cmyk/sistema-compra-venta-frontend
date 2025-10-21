import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-representante-filtrar',
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, FormsModule, MatProgressBarModule],
  templateUrl: './representante-filtrar.component.html',
  styleUrl: './representante-filtrar.component.scss'
})
export class RepresentanteFiltrarComponent {

  @Input() isCargando = false;
  @Output() filtrar = new EventEmitter<string>();

  searchTerm: string = '';
   
  onInputChange(){
    this.filtrar.emit(this.searchTerm.trim())
  }
}