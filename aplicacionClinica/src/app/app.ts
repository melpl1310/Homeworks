import { Component } from '@angular/core';

import { RotacionMedicos } from './rotacion-medicos/rotacion-medicos';
import { ListaPacientes } from './lista-pacientes/lista-pacientes';
import { Historial } from './historial/historial';
import { ComiteAdministrativo } from './comite-administrativo/comite-administrativo';
import { FormularioPacientes } from './formulario-pacientes/formulario-pacientes';

import { LinkedList } from './linkedList';
import { DoubleLinkedList } from './doubleLinkedList';
import { CircularDoubleLinkedList } from './circularDoubleLinkedList';

@Component({
  imports: [
    RotacionMedicos,
    ListaPacientes,
    Historial,
    ComiteAdministrativo,
    FormularioPacientes
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  listadoPacientes = new LinkedList();
  historial = new DoubleLinkedList();
  pacientes: any[] = [];
  comite = new CircularDoubleLinkedList();

  constructor() {
    this.agregarPaciente({
      nombre: 'Melanie',
      apellido: 'Parra',
      edad: 19,
      motivo: 'Consulta general'
    });

    this.agregarPaciente({
      nombre: 'Adrian',
      apellido: 'Hoyos',
      edad: 20,
      motivo: 'Control médico'
    });
    this.comite.append('Ana');
    this.comite.append('Carlos');
    this.comite.append('María');
  }

  agregarPaciente(paciente: any) {
    this.listadoPacientes.append(paciente);
    this.pacientes = this.listadoPacientes.print();

  }

  atenderPaciente(index: number) {
  const paciente = this.pacientes[index];
  this.listadoPacientes.remove(index);
  this.pacientes = this.listadoPacientes.print();
  this.historial.append(paciente);

  }

}