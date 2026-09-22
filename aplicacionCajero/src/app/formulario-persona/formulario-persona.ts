import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-persona',
  imports: [FormsModule],
  templateUrl: './formulario-persona.html',
  styleUrl: './formulario-persona.css'
})
export class FormularioPersona {

  nombre = '';
  monto = 0;

  @Output() personaAgregada = new EventEmitter<any>();

  agregarPersona() {
   if (!this.nombre.trim() || !this.monto) {
    return;
  }
    const persona = {
      nombre: this.nombre,
      monto: this.monto
    };

    this.personaAgregada.emit(persona);
    this.nombre = '';
    this.monto = 0;
  }
}