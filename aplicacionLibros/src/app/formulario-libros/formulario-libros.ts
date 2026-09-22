import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-libros',
  imports: [FormsModule],
  templateUrl: './formulario-libros.html',
  styleUrl: './formulario-libros.css'
})
export class FormularioLibros {
  nombre = '';
  isbn = '';
  autor = '';
  editorial = '';

  @Output() libroAgregado = new EventEmitter<any>();

  agregarLibro() {
    const libro = {
      nombre: this.nombre,
      isbn: this.isbn,
      autor: this.autor,
      editorial: this.editorial
    };

    this.libroAgregado.emit(libro);
    this.nombre = '';
    this.isbn = '';
    this.autor = '';
    this.editorial = '';
  }
}