import { Component, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormularioContactos } from './formulario-contactos/formulario-contactos';
import { ListaContactos } from './lista-contactos/lista-contactos';

export interface Contacto {
  nombre: string;
  telefono: string;
}

const CONTACTOS_STORAGE_KEY = 'contactos';

@Component({
  selector: 'app-root',
  imports: [FormularioContactos, ListaContactos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  contactos: Contacto[] = [];
  cargando = true;
  mostrarFormulario = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {

      setTimeout(() => {

        const guardados = localStorage.getItem(CONTACTOS_STORAGE_KEY);

        if (guardados) {
          this.contactos = JSON.parse(guardados);
        } else {
          this.contactos = [
            { nombre: 'Melanie Parra', telefono: '300 123 4567' },
            { nombre: 'Janner Hoyos', telefono: '310 987 6543' },
          ];
          this.guardarEnStorage();
        }
        this.cargando = false;
        this.cdr.detectChanges();
      }, 3000);
    }
  }

  private guardarEnStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(CONTACTOS_STORAGE_KEY, JSON.stringify(this.contactos));
    }
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  agregarContacto(contacto: Contacto) {
    this.contactos.push(contacto);
    this.mostrarFormulario = false;
    this.guardarEnStorage();
  }

  eliminarContacto(index: number) {
    this.contactos.splice(index, 1);
    this.guardarEnStorage();
  }
}