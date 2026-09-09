import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lista-pacientes',
  imports: [],
  templateUrl: './lista-pacientes.html',
  styleUrl: './lista-pacientes.css'
})
export class ListaPacientes {
  @Input() pacientes: any[] = [];
  @Output() pacienteAtendido = new EventEmitter<number>();
  atenderPaciente(index: number) {
    this.pacienteAtendido.emit(index);
  }
}