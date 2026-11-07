import { Component, Input } from '@angular/core';
import { Producto } from '../modelos/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class ProductosComponent {

  @Input() productos: Producto[] = [];

}