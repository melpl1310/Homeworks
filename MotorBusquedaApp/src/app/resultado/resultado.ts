import { Component, Input } from '@angular/core';
import { Producto } from '../modelos/producto';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [],
  templateUrl: './resultado.html',
  styleUrl: './resultado.css'
})
export class ResultadosComponent {

  @Input() resultados: Producto[] = [];

}