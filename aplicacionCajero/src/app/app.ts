import { Component } from '@angular/core';
import { FormularioPersona } from './formulario-persona/formulario-persona';
import { ListaPersona } from './lista-persona/lista-persona';

class Queue {
  personas: any[] = [];
  enqueue(persona: any) {
    this.personas.push(persona);
  }
  print() {
    return this.personas;
  }
}

@Component({
  selector: 'app-root',
  imports: [FormularioPersona, ListaPersona],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  cola = new Queue();
  personas: any[] = [];

  constructor() {
    this.cola.enqueue({
      nombre: 'Melanie',
      monto: 100000,
      fechaLlegada: this.fechaAleatoria()
    });

    this.cola.enqueue({
      nombre: 'Adrián',
      monto: 50000,
      fechaLlegada: this.fechaAleatoria()
    });

    this.cola.enqueue({
      nombre: 'Isabella',
      monto: 200000,
      fechaLlegada: this.fechaAleatoria()
    });

    this.actualizarLista();
  }

  fechaAleatoria() {
    const ahora = new Date();
    const minutos = Math.floor(Math.random() * 60);
    ahora.setMinutes(ahora.getMinutes() - minutos);
    return ahora;
  }

  agregarPersona(persona: any) {
    persona.fechaLlegada = new Date();
    this.cola.enqueue(persona);
    this.actualizarLista();
  }

  actualizarLista() {
    this.personas = [...this.cola.print()].sort(
      (a, b) =>
        new Date(a.fechaLlegada).getTime() -
        new Date(b.fechaLlegada).getTime()
    );
  }
}
