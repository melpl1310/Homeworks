
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { auth } from '../firebaseConfig';
import { TasksService, Task } from '../tasks';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {

  tareas: Task[] = [];

  userId = '';
  email = '';

  titulo = '';
  descripcion = '';

  editandoId: string | null = null;

  tituloEdicion = '';
  descripcionEdicion = '';

  cargando = true;
  error = '';

  constructor(
    private tasksService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userId = user.uid;
        this.email = user.email || '';

        await this.cargarTareas();
      } else {
        this.userId = '';
        this.tareas = [];
        this.cargando = false;

        await this.router.navigate(['/login']);
      }
    });
  }

  async cargarTareas(): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      this.tareas = await this.tasksService.getTasks(this.userId);
    } catch (error) {
      this.error = 'No se pudieron cargar las tareas.';
      console.error(error);
    } finally {
      this.cargando = false;
    }
  }

  async agregarTarea(): Promise<void> {
    if (!this.titulo.trim()) {
      this.error = 'El título de la tarea es obligatorio.';
      return;
    }

    this.error = '';

    try {
      await this.tasksService.addTask(
        this.userId,
        this.titulo.trim(),
        this.descripcion.trim()
      );

      this.titulo = '';
      this.descripcion = '';

      await this.cargarTareas();
    } catch (error) {
      this.error = 'No se pudo agregar la tarea.';
      console.error(error);
    }
  }

  comenzarEdicion(tarea: Task): void {
    this.editandoId = tarea.id;
    this.tituloEdicion = tarea.title;
    this.descripcionEdicion = tarea.description;
    this.error = '';
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.tituloEdicion = '';
    this.descripcionEdicion = '';
  }

  async guardarEdicion(tarea: Task): Promise<void> {
    if (!this.tituloEdicion.trim()) {
      this.error = 'El título de la tarea es obligatorio.';
      return;
    }

    this.error = '';

    try {
      await this.tasksService.updateTask(tarea.id, {
        title: this.tituloEdicion.trim(),
        description: this.descripcionEdicion.trim()
      });

      this.cancelarEdicion();
      await this.cargarTareas();
    } catch (error) {
      this.error = 'No se pudo editar la tarea.';
      console.error(error);
    }
  }

  async cambiarEstado(tarea: Task): Promise<void> {
    this.error = '';

    try {
      await this.tasksService.updateTask(tarea.id, {
        done: !tarea.done
      });

      await this.cargarTareas();
    } catch (error) {
      this.error = 'No se pudo cambiar el estado de la tarea.';
      console.error(error);
    }
  }

  async eliminarTarea(tarea: Task): Promise<void> {
    const confirmar = confirm(
      `¿Deseas eliminar la tarea "${tarea.title}"?`
    );

    if (!confirmar) {
      return;
    }

    this.error = '';

    try {
      await this.tasksService.deleteTask(tarea.id);
      await this.cargarTareas();
    } catch (error) {
      this.error = 'No se pudo eliminar la tarea.';
      console.error(error);
    }
  }

  async cerrarSesion(): Promise<void> {
    try {
      await signOut(auth);
      await this.router.navigate(['/login']);
    } catch (error) {
      this.error = 'No se pudo cerrar la sesión.';
      console.error(error);
    }
  }

  get tareasCompletadas(): number {
    return this.tareas.filter(tarea => tarea.done).length;
  }

  get tareasPendientes(): number {
    return this.tareas.filter(tarea => !tarea.done).length;
  }
}
