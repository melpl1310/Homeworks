import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Producto } from '../modelos/producto';
import { BuscadorService } from '../servicios/buscador';

import { ProductosComponent } from '../producto/producto';
import { ResultadosComponent } from '../resultado/resultado';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [
    FormsModule,
    ProductosComponent,
    ResultadosComponent
  ],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css'
})
export class BuscadorComponent {

  nombre: string = '';

  popularidad: number = 50;

  prefijo: string = '';

  cantidad: number = 3;

  productos: Producto[] = [];

  resultados: Producto[] = [];

  mensaje: string = '';

  constructor(private buscadorService: BuscadorService) {

    const productosIniciales: Producto[] = [
      { name: 'air max', popularity: 90 },
      { name: 'air force', popularity: 95 },
      { name: 'air jordan', popularity: 85 },
      { name: 'adidas boost', popularity: 80 },
      { name: 'adidas superstar', popularity: 88 },
      { name: 'nike dunk', popularity: 92 },
      { name: 'nike blazer', popularity: 75 },
      { name: 'puma suede', popularity: 70 }
    ];

    productosIniciales.forEach(product => {
      this.agregarAlSistema(product);
    });
  }

  private agregarAlSistema(product: Producto): void {

    this.buscadorService.insert(product);

    this.productos.push(product);
  }

  agregarProducto(): void {

    const nombreLimpio = this.nombre.trim();

    if (!nombreLimpio) {
      this.mensaje = 'Escribe el nombre del producto.';
      return;
    }

    if (
      this.productos.some(
        p => p.name.toLowerCase() === nombreLimpio.toLowerCase()
      )
    ) {
      this.mensaje = 'Este producto ya existe.';
      return;
    }

    if (
      !Number.isFinite(this.popularidad) ||
      this.popularidad < 0 ||
      this.popularidad > 100
    ) {
      this.mensaje = 'La popularidad debe estar entre 0 y 100.';
      return;
    }

    const nuevoProducto: Producto = {
      name: nombreLimpio,
      popularity: this.popularidad
    };

    this.agregarAlSistema(nuevoProducto);

    this.nombre = '';
    this.popularidad = 50;

    this.mensaje = 'Producto agregado correctamente.';

    this.buscar();
  }

  buscar(): void {

    if (!this.prefijo.trim()) {
      this.resultados = [];
      this.mensaje = 'Escribe un prefijo para buscar.';
      return;
    }

    if (!Number.isInteger(this.cantidad) || this.cantidad < 1) {
      this.resultados = [];
      this.mensaje = 'La cantidad debe ser un número mayor que cero.';
      return;
    }

    this.resultados = this.buscadorService.searchTopK(
      this.prefijo,
      this.cantidad
    );

    if (this.resultados.length === 0) {
      this.mensaje = 'No se encontraron productos.';
    } else {
      this.mensaje = `Se encontraron ${this.resultados.length} productos.`;
    }
  }

  limpiar(): void {

    this.prefijo = '';

    this.resultados = [];

    this.mensaje = '';
  }
}