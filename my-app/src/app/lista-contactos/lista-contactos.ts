import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contacto } from '../app';

@Component({
  selector: 'app-lista-contactos',
  imports: [],
  templateUrl: './lista-contactos.html',
  styleUrl: './lista-contactos.css'
})
export class ListaContactos {

  @Input() contactos: Contacto[] = [];
  @Output() contactoEliminado = new EventEmitter<number>();

  eliminarContacto(index: number) {
    this.contactoEliminado.emit(index);
  }
}