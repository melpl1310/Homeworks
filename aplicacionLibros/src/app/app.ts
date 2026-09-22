import { Component } from '@angular/core';
import { FormularioLibros } from './formulario-libros/formulario-libros';
import { ListaLibros } from './lista-libros/lista-libros';

@Component({
  selector: 'app-root',
  imports: [FormularioLibros, ListaLibros],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  libros: any[] = [];

  constructor() {

    this.libros.push({
      nombre: 'Harry Potter y la Piedra Filosofal',
      isbn: '978-0307474728',
      autor: 'J. K. Rowling',
      editorial: 'Salamandra'
    });

    this.libros.push({
      nombre: 'Un trato con el Rey de los elfos',
      isbn: '978-0156012195',
      autor: 'ELISE. KOVA',
      editorial: 'Umbriel'
    });
  }

  agregarLibro(libro: any) {
    console.log('LIBRO RECIBIDO:', libro);
    this.libros = [...this.libros, libro];
  }

  eliminarUltimoLibro() {
    if (this.libros.length > 0) {
      this.libros = this.libros.slice(0, -1);
    }
  }
}