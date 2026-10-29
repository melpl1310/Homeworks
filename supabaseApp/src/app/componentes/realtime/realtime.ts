
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Tarea, TareasService } from '../../services/tareas.service';
import { AuthService } from '../../services/auth.service';
import { RealtimeChannel } from '@supabase/supabase-js';

@Component({
  selector: 'app-realtime',
  standalone: true,
  imports: [],
  templateUrl: './realtime.html',
  styleUrl: './realtime.css'
})
export class Realtime implements OnInit, OnDestroy {

  tareas = signal<Tarea[]>([]);
  usuario: any = null;
  canal: RealtimeChannel | null = null;

  constructor(
    private tareasService: TareasService,
    private auth: AuthService
  ) {}

  async ngOnInit() {

    this.usuario = await this.auth.obtenerUsuario();

    if (!this.usuario) {
      return;
    }

    await this.cargarTareas();

    this.canal = this.tareasService.escucharCambios(() => {
      void this.cargarTareas();
    });

  }

  async cargarTareas() {

    const { data, error } =
      await this.tareasService.listarTareas();

    if (!error) {
      this.tareas.set(data || []);
    } else {
      this.tareas.set([]);
    }

  }

  ngOnDestroy() {

    if (this.canal) {
      void this.tareasService.dejarDeEscuchar(this.canal);
    }

  }

}
