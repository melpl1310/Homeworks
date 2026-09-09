import { Component } from '@angular/core';
import { CircularLinkedList } from '../circularLinkedList';

@Component({
  selector: 'app-rotacion-medicos',
  imports: [],
  templateUrl: './rotacion-medicos.html',
  styleUrl: './rotacion-medicos.css'
})
export class RotacionMedicos {
  medicos = new CircularLinkedList();
  medicoActual = '';
  constructor() {
    this.medicos.append('Dr. Pérez');
    this.medicos.append('Dra. Gómez');
    this.medicos.append('Dr. López');
    this.medicoActual = this.medicos.head!.value;

    setInterval(() => {
      this.cambiarMedico();
    }, 10000);
  }

  cambiarMedico() {
    if (this.medicos.head !== null) {
      this.medicos.head = this.medicos.head.next;
      this.medicoActual = this.medicos.head!.value;
    }
  }
}