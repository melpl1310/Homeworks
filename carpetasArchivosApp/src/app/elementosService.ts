import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface Elemento {
  id: string;
  userId: string;
  nombre: string;
  tipo: 'carpeta' | 'archivo';
  correoCreador: string;
  padreId: string | null;
}

export class Nodo {
  elemento: Elemento;
  hijos: Nodo[];

  constructor(elemento: Elemento) {
    this.elemento = elemento;
    this.hijos = [];
  }

  agregarHijo(hijo: Nodo): boolean {
    if (this.elemento.tipo === 'archivo') {
      return false;
    }

    this.hijos.push(hijo);
    return true;
  }
}

export class Arbol {
  raiz: Nodo;
  nodos: Nodo[];

  constructor() {
    this.raiz = new Nodo({
      id: 'raiz',
      userId: '',
      nombre: 'Mis archivos',
      tipo: 'carpeta',
      correoCreador: '',
      padreId: null
    });

    this.nodos = [this.raiz];
  }

  buscar(id: string, nodo: Nodo = this.raiz): Nodo | null {
    if (nodo.elemento.id === id) {
      return nodo;
    }

    for (const hijo of nodo.hijos) {
      const encontrado = this.buscar(id, hijo);

      if (encontrado) {
        return encontrado;
      }
    }

    return null;
  }

  insertar(elemento: Elemento): boolean {
    const padre = elemento.padreId
      ? this.buscar(elemento.padreId)
      : this.raiz;

    if (!padre || padre.elemento.tipo !== 'carpeta') {
      return false;
    }

    const nodo = new Nodo(elemento);

    if (padre.agregarHijo(nodo)) {
      this.nodos.push(nodo);
      return true;
    }

    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ElementosService {
  private elementosCollection = collection(db, 'elementos');

  async getElementos(
    userId: string,
    correoCreador: string
  ): Promise<Elemento[]> {
    const consultaUsuario = query(
      this.elementosCollection,
      where('userId', '==', userId)
    );

    const consultaCorreo = query(
      this.elementosCollection,
      where('correoCreador', '==', correoCreador)
    );

    const [resultadoUsuario, resultadoCorreo] = await Promise.all([
      getDocs(consultaUsuario),
      getDocs(consultaCorreo)
    ]);

    const documentos = new Map<string, Elemento>();

    resultadoUsuario.docs.forEach(item => {
      documentos.set(item.id, {
        id: item.id,
        ...item.data()
      } as Elemento);
    });

    resultadoCorreo.docs.forEach(item => {
      documentos.set(item.id, {
        id: item.id,
        ...item.data(),
        userId
      } as Elemento);
    });

    return Array.from(documentos.values());
  }

  addElemento(
    userId: string,
    nombre: string,
    tipo: 'carpeta' | 'archivo',
    correoCreador: string,
    padreId: string | null
  ) {
    return addDoc(this.elementosCollection, {
      userId,
      nombre,
      tipo,
      correoCreador,
      padreId,
      fechaCreacion: new Date()
    });
  }

  updateElemento(elementoId: string, data: Partial<Elemento>) {
    return updateDoc(doc(db, 'elementos', elementoId), data);
  }

  async deleteElemento(
    elementoId: string,
    elementos: Elemento[]
  ): Promise<void> {
    const idsEliminar = new Set<string>([elementoId]);
    let huboCambios = true;

    while (huboCambios) {
      huboCambios = false;

      for (const elemento of elementos) {
        if (
          elemento.padreId !== null &&
          idsEliminar.has(elemento.padreId) &&
          !idsEliminar.has(elemento.id)
        ) {
          idsEliminar.add(elemento.id);
          huboCambios = true;
        }
      }
    }

    await Promise.all(
      Array.from(idsEliminar).map(id =>
        deleteDoc(doc(db, 'elementos', id))
      )
    );
  }
}
