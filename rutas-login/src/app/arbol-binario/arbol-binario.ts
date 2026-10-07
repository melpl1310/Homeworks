import { Component } from '@angular/core';
import * as d3 from 'd3';

class Nodo {
  valor: number;
  izquierdo: Nodo | null;
  derecho: Nodo | null;

  constructor(valor: number) {
    this.valor = valor;
    this.izquierdo = null;
    this.derecho = null;
  }
}

class Arbol {
  raiz: Nodo | null = null;

  insertar(valor: number): void {
    const nuevoNodo = new Nodo(valor);

    if (this.raiz === null) {
      this.raiz = nuevoNodo;
      return;
    }

    this.insertarNodo(this.raiz, nuevoNodo);
  }

  private insertarNodo(actual: Nodo, nuevo: Nodo): void {
    if (nuevo.valor < actual.valor) {
      if (actual.izquierdo === null) {
        actual.izquierdo = nuevo;
      } else {
        this.insertarNodo(actual.izquierdo, nuevo);
      }
    } else if (nuevo.valor > actual.valor) {
      if (actual.derecho === null) {
        actual.derecho = nuevo;
      } else {
        this.insertarNodo(actual.derecho, nuevo);
      }
    }
  }

  inOrder(nodo: Nodo | null, resultado: number[] = []): number[] {
    if (nodo !== null) {
      this.inOrder(nodo.izquierdo, resultado);
      resultado.push(nodo.valor);
      this.inOrder(nodo.derecho, resultado);
    }

    return resultado;
  }

  preOrder(nodo: Nodo | null, resultado: number[] = []): number[] {
    if (nodo !== null) {
      resultado.push(nodo.valor);
      this.preOrder(nodo.izquierdo, resultado);
      this.preOrder(nodo.derecho, resultado);
    }

    return resultado;
  }

  postOrder(nodo: Nodo | null, resultado: number[] = []): number[] {
    if (nodo !== null) {
      this.postOrder(nodo.izquierdo, resultado);
      this.postOrder(nodo.derecho, resultado);
      resultado.push(nodo.valor);
    }

    return resultado;
  }

  buscar(valor: number): boolean {
    if (this.raiz === null) {
      return false;
    }

    return this.buscarNodo(this.raiz, valor);
  }

  private buscarNodo(nodo: Nodo | null, valor: number): boolean {
    if (nodo === null) {
      return false;
    }

    if (nodo.valor === valor) {
      return true;
    }

    if (valor < nodo.valor) {
      return this.buscarNodo(nodo.izquierdo, valor);
    }

    return this.buscarNodo(nodo.derecho, valor);
  }
}

interface DatoArbol {
  valor: number;
  children?: DatoArbol[];
}

@Component({
  selector: 'app-arbol-binario',
  standalone: true,
  templateUrl: './arbol-binario.html',
  styleUrl: './arbol-binario.css'
})
export class ArbolBinario {
  arbol = new Arbol();

  mensaje = '';

  inOrden: number[] = [];
  preOrden: number[] = [];
  postOrden: number[] = [];

  agregar(valorTexto: string): void {
    if (valorTexto === '') {
      return;
    }

    const valor = Number(valorTexto);

    if (isNaN(valor)) {
      return;
    }

    if (this.arbol.buscar(valor)) {
      this.mensaje = `El número ${valor} ya está en el árbol.`;
      return;
    }

    this.arbol.insertar(valor);
    this.actualizarRecorridos();
    this.dibujarArbol();

    this.mensaje = `Se agregó el número ${valor}.`;
  }

  buscar(valorTexto: string): void {
    if (valorTexto === '') {
      return;
    }

    const valor = Number(valorTexto);

    if (isNaN(valor)) {
      return;
    }

    if (this.arbol.buscar(valor)) {
      this.mensaje = `El número ${valor} sí está en el árbol.`;
    } else {
      this.mensaje = `El número ${valor} no está en el árbol.`;
    }
  }

  actualizarRecorridos(): void {
    this.inOrden = this.arbol.inOrder(this.arbol.raiz);
    this.preOrden = this.arbol.preOrder(this.arbol.raiz);
    this.postOrden = this.arbol.postOrder(this.arbol.raiz);

    console.log('InOrder:', this.inOrden);
    console.log('PostOrder:', this.postOrden);
    console.log('PreOrder:', this.preOrden);
  }

  convertirNodo(nodo: Nodo): DatoArbol {
    const resultado: DatoArbol = {
      valor: nodo.valor,
      children: []
    };

    if (nodo.izquierdo !== null) {
      resultado.children!.push(
        this.convertirNodo(nodo.izquierdo)
      );
    }

    if (nodo.derecho !== null) {
      resultado.children!.push(
        this.convertirNodo(nodo.derecho)
      );
    }

    if (resultado.children!.length === 0) {
      delete resultado.children;
    }

    return resultado;
  }

  dibujarArbol(): void {
    const contenedor = d3.select('#arbol');

    contenedor.selectAll('*').remove();

    if (this.arbol.raiz === null) {
      return;
    }

    const datos = this.convertirNodo(this.arbol.raiz);
    const raiz = d3.hierarchy<DatoArbol>(datos);

    const ancho = 700;
    const alto = 400;

    const arbolD3 = d3
      .tree<DatoArbol>()
      .size([ancho - 100, alto - 100]);

    arbolD3(raiz);

    const svg = contenedor
      .append('svg')
      .attr('viewBox', `0 0 ${ancho} ${alto}`)
      .attr('width', '100%')
      .attr('height', alto);

    const grupo = svg
      .append('g')
      .attr('transform', 'translate(50, 40)');

    grupo
      .selectAll('.linea')
      .data(raiz.links())
      .enter()
      .append('line')
      .attr('x1', d => d.source.x ?? 0)
      .attr('y1', d => d.source.y ?? 0)
      .attr('x2', d => d.target.x ?? 0)
      .attr('y2', d => d.target.y ?? 0)
      .attr('stroke', '#b9a7d8')
      .attr('stroke-width', 3);

    const nodos = grupo
      .selectAll('.nodo')
      .data(raiz.descendants())
      .enter()
      .append('g')
      .attr(
        'transform',
        d => `translate(${d.x ?? 0}, ${d.y ?? 0})`
      );

    nodos
      .append('circle')
      .attr('r', 27)
      .attr('fill', '#f8d8e8')
      .attr('stroke', '#a98bc4')
      .attr('stroke-width', 3);

    nodos
      .append('text')
      .text(d => d.data.valor)
      .attr('text-anchor', 'middle')
      .attr('dy', '5px')
      .attr('fill', '#5f4b66')
      .attr('font-size', '15px')
      .attr('font-weight', 'bold');
  }
}