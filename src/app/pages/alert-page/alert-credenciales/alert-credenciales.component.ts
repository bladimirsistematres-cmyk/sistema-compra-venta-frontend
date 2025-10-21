import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-alert-credenciales',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './alert-credenciales.component.html',
  styleUrl: './alert-credenciales.component.scss'
})
export class AlertCredencialesComponent {

}