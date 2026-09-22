import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lista-libros',
  imports: [],
  templateUrl: './lista-libros.html',
  styleUrl: './lista-libros.css'
})
export class ListaLibros {
  @Input() libros: any[] = [];
}
