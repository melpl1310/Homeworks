import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Grafo as GrafoComponent } from './grafo/grafo';
import { GrafoService } from './services/grafo.service';

import {
  Persona,
  Ciudad,
  NodoGrafo,
  AristaGrafo
} from './models/grafo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GrafoComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private grafoService = inject(GrafoService);

  // Datos de los formularios
  nombrePersona = '';
  edadPersona: number | null = null;
  ciudadSeleccionada = '';

  nombreCiudad = '';

  // Ciudad para consultar sus habitantes
  ciudadConsulta = '';

  personas: Persona[] = [];
  ciudades: Ciudad[] = [];
  nodos: NodoGrafo[] = [];
  aristas: AristaGrafo[] = [];

  habitantes: Persona[] = [];

  mensaje = '';
  tipoMensaje: 'exito' | 'error' | '' = '';

  constructor() {
    this.actualizarDatos();
  }

  actualizarDatos(): void {
    this.personas = this.grafoService.obtenerPersonas();
    this.ciudades = this.grafoService.obtenerCiudades();
    this.nodos = this.grafoService.obtenerNodos();
    this.aristas = this.grafoService.obtenerAristas();
  }

  nombreCiudadDe(ciudadId: string): string {
    return this.ciudades.find((ciudad) => ciudad.id === ciudadId)?.nombre
      ?? 'Ciudad no disponible';
  }

  agregarCiudad(): void {

    try {

      this.grafoService.agregarCiudad(this.nombreCiudad);

      this.nombreCiudad = '';

      this.actualizarDatos();

      this.mostrarMensaje('Ciudad agregada correctamente.', 'exito');

    } catch (error) {

      this.mostrarMensaje(
        error instanceof Error ? error.message : 'No se pudo agregar la ciudad.',
        'error'
      );

    }
  }

  // Crear una persona y conectarla con su ciudad
  agregarPersona(): void {

    try {

      if (this.edadPersona === null || this.edadPersona === undefined) {
        throw new Error('Debes ingresar la edad de la persona.');
      }

      this.grafoService.agregarPersona(
        this.nombrePersona,
        this.edadPersona,
        this.ciudadSeleccionada
      );

      this.nombrePersona = '';
      this.edadPersona = null;
      this.ciudadSeleccionada = '';

      this.actualizarDatos();

      if (this.ciudadConsulta) {
        this.consultarHabitantes();
      }

      this.mostrarMensaje('Persona agregada y conectada con su ciudad.', 'exito');

    } catch (error) {

      this.mostrarMensaje(
        error instanceof Error ? error.message : 'No se pudo agregar la persona.',
        'error'
      );

    }
  }

  consultarHabitantes(): void {

    if (!this.ciudadConsulta) {
      this.habitantes = [];
      return;
    }

    this.habitantes = this.grafoService.personasPorCiudad(
      this.ciudadConsulta
    );
  }

  eliminarNodo(id: string): void {

    const nodo = this.grafoService.searchNode(id);

    if (!nodo) {
      return;
    }

    const mensajeConfirmacion = nodo.tipo === 'ciudad'
      ? `¿Eliminar ${nodo.nombre} y todas las personas asociadas con esa ciudad?`
      : `¿Eliminar a ${nodo.nombre}?`;

    if (!confirm(mensajeConfirmacion)) {
      return;
    }

    this.grafoService.removeNode(id);

    this.actualizarDatos();

    if (!this.ciudades.some((ciudad) => ciudad.id === this.ciudadConsulta)) {
      this.ciudadConsulta = '';
    }

    this.consultarHabitantes();

    this.mostrarMensaje('Elemento eliminado correctamente.', 'exito');
  }

  buscarNodo(id: string): void {
    const nodo = this.grafoService.searchNode(id);

    if (nodo) {
      console.log('Nodo encontrado:', nodo);
      this.mostrarMensaje(`Nodo encontrado: ${nodo.nombre}.`, 'exito');
    } else {
      this.mostrarMensaje('No se encontró el nodo.', 'error');
    }
  }

  verConexiones(id: string): void {
    const conexiones = this.grafoService.printAdjacency(id);

    console.log('Conexiones:', conexiones);

    if (conexiones.length === 0) {
      this.mostrarMensaje('Este nodo no tiene conexiones.', 'error');
      return;
    }

    const nombres = conexiones
      .map(idConexion => this.grafoService.searchNode(idConexion)?.nombre)
      .filter(nombre => nombre !== undefined);

    this.mostrarMensaje(
      `Conectado con: ${nombres.join(', ')}.`,
      'exito'
    );
  }

  imprimirGrafo(): void {
    this.grafoService.print();
    this.mostrarMensaje('Contenido del grafo impreso en la consola.', 'exito');
  }

  private mostrarMensaje(
    texto: string,
    tipo: 'exito' | 'error'
  ): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
  }
}