
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarea, TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})
export class Tareas implements OnInit {

  tareas = signal<Tarea[]>([]);
  titulo = '';
  mensaje = '';
  guardando = false;

  constructor(private tareasService: TareasService) {}

  async ngOnInit() {
    await this.cargarTareas();
  }

  async cargarTareas() {

    try {
      const { data, error } =
        await this.tareasService.listarTareas();

      if (error) {
        this.mensaje = 'Error al cargar las tareas';
        this.tareas.set([]);
        return;
      }

      this.tareas.set(data || []);
    } catch (error) {
      this.tareas.set([]);
      this.mensaje = error instanceof Error
        ? error.message
        : 'Error al cargar las tareas';
    }
  }

  async agregarTarea() {

    const titulo = this.titulo.trim();

    if (!titulo) {
      this.mensaje = 'Escribe una tarea';
      return;
    }

    if (this.esDuplicada(titulo)) {
      this.mensaje = 'Ya existe una tarea con ese nombre.';
      return;
    }

    if (this.guardando) {
      return;
    }

    this.guardando = true;
    try {
      const { error } = await this.tareasService.crearTarea(titulo);

      if (error) {
        this.mensaje = 'code' in error && error.code === '23505'
          ? 'Ya existe una tarea con ese nombre.'
          : 'No se pudo agregar la tarea';
        return;
      }

      this.titulo = '';
      this.mensaje = '';
      await this.cargarTareas();
    } catch (error) {
      this.mensaje = error instanceof Error
        ? error.message
        : 'No se pudo agregar la tarea';
    } finally {
      this.guardando = false;
    }
  }

  async completarTarea(tarea: Tarea) {

    const { error } =
      await this.tareasService.actualizarTarea(
        tarea.id,
        tarea.titulo,
        !tarea.completada
      );

    if (error) {
      this.mensaje = 'Error al actualizar la tarea';
      return;
    }

    await this.cargarTareas();

  }

  async editarTarea(tarea: Tarea) {

    const nuevoTitulo = prompt(
      'Escribe el nuevo título:',
      tarea.titulo
    );

    if (nuevoTitulo === null || !nuevoTitulo.trim()) {
      return;
    }

    const titulo = nuevoTitulo.trim();

    if (this.esDuplicada(titulo, tarea.id)) {
      this.mensaje = 'Ya existe una tarea con ese nombre.';
      return;
    }

    const { error } =
      await this.tareasService.actualizarTarea(
        tarea.id,
        titulo,
        tarea.completada
      );

    if (error) {
        this.mensaje = 'code' in error && error.code === '23505'
        ? 'Ya existe una tarea con ese nombre.'
        : 'Error al editar la tarea';
      return;
    }

    await this.cargarTareas();

  }

  private esDuplicada(titulo: string, excluirId?: number): boolean {
    const tituloNormalizado = titulo.trim().toLowerCase();

    return this.tareas().some((tarea) =>
      tarea.id !== excluirId &&
      tarea.titulo.trim().toLowerCase() === tituloNormalizado
    );
  }

  async eliminarTarea(id: number) {

    if (!confirm('¿Deseas eliminar esta tarea?')) {
      return;
    }

    const { error } =
      await this.tareasService.eliminarTarea(id);

    if (error) {
      this.mensaje = 'Error al eliminar la tarea';
      return;
    }

    await this.cargarTareas();

  }

}
