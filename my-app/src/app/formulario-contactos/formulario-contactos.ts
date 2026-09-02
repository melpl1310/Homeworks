import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contacto } from '../app';

@Component({
  selector: 'app-formulario-contactos',
  imports: [FormsModule],
  templateUrl: './formulario-contactos.html',
  styleUrl: './formulario-contactos.css'
})
export class FormularioContactos {

  nombre = '';
  telefono = '';

  @Output() contactoAgregado = new EventEmitter<Contacto>();
  @Output() cancelar = new EventEmitter<void>();

  guardarContacto() {

    if (this.nombre.trim() === '' || this.telefono.trim() === '') {
      return;
    }

    const nuevoContacto: Contacto = {
      nombre: this.nombre.trim(),
      telefono: this.telefono.trim()
    };

    this.contactoAgregado.emit(nuevoContacto);

    this.nombre = '';
    this.telefono = '';
  }

  volver() {
    this.cancelar.emit();
  }
}