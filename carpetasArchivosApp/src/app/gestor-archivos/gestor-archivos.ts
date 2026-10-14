
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ElementosService,
  Elemento,
  Arbol,
  Nodo
} from '../elementosService';
import { AuthService } from '../auth';

@Component({
  selector: 'app-gestor-archivos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestor-archivos.html',
  styleUrl: './gestor-archivos.scss'
})
export class GestorArchivos implements OnInit {
  arbol = signal(new Arbol());
  elementos = signal<Nodo[]>([]);
  carpetaActual = signal<Nodo>(this.arbol().raiz);
  nombre = signal('');
  tipo = signal<'carpeta' | 'archivo'>('carpeta');
  mensaje = signal('');
  cargando = signal(false);

  constructor(
    public authService: AuthService,
    private router: Router,
    private elementosService: ElementosService
  ) {}

  async ngOnInit() {
    const usuario = await this.authService.esperarUsuario();

    if (!usuario) {
      await this.router.navigate(['/login']);
      return;
    }

    await this.cargarElementos();
  }

  async cargarElementos() {
    this.cargando.set(true);
    this.mensaje.set('');

    try {
      const usuario = await this.authService.esperarUsuario();

      if (!usuario) {
        await this.router.navigate(['/login']);
        return;
      }

      const carpetaId = this.carpetaActual().elemento.id;

      const datos: Elemento[] =
        await this.elementosService.getElementos(
          usuario.uid,
          usuario.email ?? ''
        );

      const nuevoArbol = new Arbol();
      let pendientes = [...datos];
      let huboCambios = true;

      while (pendientes.length > 0 && huboCambios) {
        huboCambios = false;
        const restantes: Elemento[] = [];

        for (const elemento of pendientes) {
          if (nuevoArbol.insertar(elemento)) {
            huboCambios = true;
          } else {
            restantes.push(elemento);
          }
        }

        pendientes = restantes;
      }

      this.arbol.set(nuevoArbol);

      const carpeta =
        nuevoArbol.buscar(carpetaId) ?? nuevoArbol.raiz;

      this.carpetaActual.set(carpeta);
      this.elementos.set(carpeta.hijos);
    } catch (error) {
      console.error('Error al cargar elementos:', error);
      this.mensaje.set('No se pudieron cargar los archivos.');
    } finally {
      this.cargando.set(false);
    }
  }

  async crearElemento() {
    const usuario = await this.authService.esperarUsuario();

    if (!usuario || !usuario.email) {
      this.mensaje.set('Debes iniciar sesión para crear elementos.');
      await this.router.navigate(['/login']);
      return;
    }

    if (!this.nombre().trim()) {
      this.mensaje.set('Escribe un nombre.');
      return;
    }

    if (this.carpetaActual().elemento.tipo !== 'carpeta') {
      this.mensaje.set(
        'No puedes crear elementos dentro de un archivo.'
      );
      return;
    }

    try {
      await this.elementosService.addElemento(
        usuario.uid,
        this.nombre().trim(),
        this.tipo(),
        usuario.email,
        this.carpetaActual().elemento.id === 'raiz'
          ? null
          : this.carpetaActual().elemento.id
      );

      this.nombre.set('');

      await this.cargarElementos();

      this.mensaje.set('Elemento creado correctamente.');
    } catch (error) {
      console.error('Error al crear elemento:', error);
      this.mensaje.set('No se pudo guardar el elemento.');
    }
  }

  abrirCarpeta(nodo: Nodo) {
    if (nodo.elemento.tipo !== 'carpeta') {
      this.mensaje.set('Los archivos no pueden abrirse como carpetas.');
      return;
    }

    this.carpetaActual.set(nodo);
    this.elementos.set(nodo.hijos);
    this.mensaje.set('');
  }

  volver() {
    const padreId = this.carpetaActual().elemento.padreId;

    if (padreId === null) {
      this.carpetaActual.set(this.arbol().raiz);
    } else {
      const padre =
        this.arbol().buscar(padreId) ?? this.arbol().raiz;

      this.carpetaActual.set(padre);
    }

    this.elementos.set(this.carpetaActual().hijos);
    this.mensaje.set('');
  }

  async eliminarElemento(nodo: Nodo) {
    const elemento = nodo.elemento;

    const confirmado = confirm(
      `¿Seguro que deseas eliminar "${elemento.nombre}"? Si es una carpeta, también se eliminará todo su contenido.`
    );

    if (!confirmado) {
      return;
    }

    this.mensaje.set('');

    try {
      const todosLosElementos = this.arbol()
        .nodos
        .filter(n => n.elemento.id !== 'raiz')
        .map(n => n.elemento);

      await this.elementosService.deleteElemento(
        elemento.id,
        todosLosElementos
      );

      await this.cargarElementos();

      this.mensaje.set(
        `${elemento.tipo === 'carpeta' ? 'Carpeta' : 'Archivo'} eliminado correctamente.`
      );
    } catch (error) {
      console.error('Error al eliminar elemento:', error);
      this.mensaje.set('No se pudo eliminar el elemento.');
    }
  }

  async cerrarSesion() {
    await this.authService.cerrarSesion();
    await this.router.navigate(['/login']);
  }
}
