import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  imports: [FormsModule],
  selector: 'app-formulario-pacientes',
  styleUrl: './formulario-pacientes.css',
  templateUrl: './formulario-pacientes.html',
})
export class FormularioPacientes {
  nombre: string = '';
  apellido: string = '';
  edad: number | null = null;
  motivo: string = '';

  @Output() pacienteAgregado = new EventEmitter<any>();

  agregarPaciente() {

    if (
      this.nombre === '' ||
      this.apellido === '' ||
      this.edad === null
    ) {
      return;
    }

    const paciente = {
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      motivo: this.motivo
    };

    this.pacienteAgregado.emit(paciente);
    this.nombre = '';
    this.apellido = '';
    this.edad = null;
    this.motivo = '';
  }

}