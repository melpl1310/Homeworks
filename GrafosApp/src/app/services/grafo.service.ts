import { Injectable } from '@angular/core';

import {
  Persona,
  Ciudad,
  NodoGrafo,
  AristaGrafo
} from '../models/grafo.model';

@Injectable({
  providedIn: 'root'
})
export class GrafoService {

  private personas: Persona[] = [];
  private ciudades: Ciudad[] = [];

  private nodos: NodoGrafo[] = [];
  private aristas: AristaGrafo[] = [];

  private generarId(prefijo: string): string {
    let id: string;

    do {
      id = `${prefijo}-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}`;
    } while (this.searchNode(id));

    return id;
  }

  addNode(nodo: NodoGrafo): void {
    if (this.searchNode(nodo.id)) {
      throw new Error('Ya existe un nodo con ese identificador.');
    }

    this.nodos.push(nodo);
  }

  searchNode(id: string): NodoGrafo | undefined {
    return this.nodos.find(nodo => nodo.id === id);
  }

  addEdge(origen: string, destino: string): void {
    const nodoOrigen = this.searchNode(origen);
    const nodoDestino = this.searchNode(destino);

    if (!nodoOrigen || !nodoDestino) {
      throw new Error('Los dos nodos deben existir en el grafo.');
    }

    if (nodoOrigen.tipo === nodoDestino.tipo) {
      throw new Error('Las conexiones deben ser entre una persona y una ciudad.');
    }

    const existe = this.aristas.some(
      arista =>
        (arista.origen === origen && arista.destino === destino) ||
        (arista.origen === destino && arista.destino === origen)
    );

    if (existe) {
      return;
    }

    const idPersona = nodoOrigen.tipo === 'persona' ? origen : destino;
    const yaTieneCiudad = this.aristas.some(
      arista => arista.origen === idPersona || arista.destino === idPersona
    );

    if (yaTieneCiudad) {
      throw new Error('Una persona solo puede estar asociada a una ciudad.');
    }

    this.aristas.push({ origen, destino });
  }

  agregarPersona(nombre: string, edad: number, ciudadId: string): void {

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      throw new Error('El nombre de la persona es obligatorio.');
    }

    const nombreNormalizado = this.normalizarNombre(nombreLimpio);
    const personaExistente = this.personas.some(
      persona => this.normalizarNombre(persona.nombre) === nombreNormalizado
    );

    if (personaExistente) {
      throw new Error('Ya existe una persona registrada con ese nombre.');
    }

    if (!Number.isInteger(edad) || edad < 0 || edad > 130) {
      throw new Error('Ingresa una edad válida entre 0 y 130 años.');
    }

    const ciudad = this.ciudades.find(c => c.id === ciudadId);

    if (!ciudad) {
      throw new Error('Debes seleccionar una ciudad existente.');
    }

    const id = this.generarId('persona');

    const persona: Persona = {
      id,
      nombre: nombreLimpio,
      edad,
      ciudadId
    };

    this.addNode({
      id,
      tipo: 'persona',
      nombre: nombreLimpio,
      edad
    });

    this.addEdge(id, ciudadId);
    this.personas.push(persona);
  }

  private normalizarNombre(nombre: string): string {
    return nombre
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLocaleLowerCase();
  }

  agregarCiudad(nombre: string): void {

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      throw new Error('El nombre de la ciudad es obligatorio.');
    }

    const existe = this.ciudades.some(
      ciudad => ciudad.nombre.toLowerCase() === nombreLimpio.toLowerCase()
    );

    if (existe) {
      throw new Error('Esta ciudad ya está registrada.');
    }

    const id = this.generarId('ciudad');

    const ciudad: Ciudad = {
      id,
      nombre: nombreLimpio
    };

    this.ciudades.push(ciudad);

    this.addNode({
      id,
      tipo: 'ciudad',
      nombre: nombreLimpio
    });
  }

  obtenerPersonas(): Persona[] {
    return [...this.personas];
  }

  obtenerCiudades(): Ciudad[] {
    return [...this.ciudades];
  }

  obtenerNodos(): NodoGrafo[] {
    return this.nodos.map(nodo => ({ ...nodo }));
  }

  obtenerAristas(): AristaGrafo[] {
    return this.aristas.map(arista => ({ ...arista }));
  }

  personasPorCiudad(ciudadId: string): Persona[] {
    return this.personas.filter(
      persona => persona.ciudadId === ciudadId
    );
  }

  printAdjacency(id: string): string[] {
    return this.aristas
      .filter(arista => arista.origen === id || arista.destino === id)
      .map(arista =>
        arista.origen === id ? arista.destino : arista.origen
      );
  }

  isEmpty(): boolean {
    return this.nodos.length === 0;
  }

  removeNode(id: string): void {

    const nodo = this.searchNode(id);

    if (!nodo) {
      return;
    }

    this.nodos = this.nodos.filter(n => n.id !== id);

    this.aristas = this.aristas.filter(
      arista => arista.origen !== id && arista.destino !== id
    );

    if (nodo.tipo === 'persona') {
      this.personas = this.personas.filter(p => p.id !== id);
    }

    if (nodo.tipo === 'ciudad') {

      this.ciudades = this.ciudades.filter(c => c.id !== id);

      const habitantes = this.personasPorCiudad(id);

      habitantes.forEach(persona => {
        this.removeNode(persona.id);
      });
    }
  }

  print(): void {
    console.log('Nodos:', this.nodos);
    console.log('Aristas:', this.aristas);
    console.log('Personas:', this.personas);
    console.log('Ciudades:', this.ciudades);
  }
}