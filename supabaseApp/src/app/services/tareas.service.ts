import { Injectable } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

export interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
  user_id: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private supabase;

  constructor(supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async listarTareas() {
    return await this.supabase
      .from('tareas')
      .select('*')
      .order('created_at', { ascending: false });
  }

  async crearTarea(titulo: string) {
    const { data, error } = await this.supabase.auth.getUser();

    if (error || !data.user) {
      return {
        data: null,
        error: error ?? new Error('Debes iniciar sesión.')
      };
    }

    return await this.supabase
      .from('tareas')
      .insert({
        titulo: titulo,
        user_id: data.user.id
      })
      .select()
      .single();
  }

  async actualizarTarea(
    id: number,
    titulo: string,
    completada: boolean
  ) {
    return await this.supabase
      .from('tareas')
      .update({ titulo, completada })
      .eq('id', id)
      .select()
      .single();
  }

  async eliminarTarea(id: number) {
    return await this.supabase
      .from('tareas')
      .delete()
      .eq('id', id);
  }

  escucharCambios(callback: () => void): RealtimeChannel {
    return this.supabase
      .channel('cambios-tareas')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tareas'
        },
        () => callback()
      )
      .subscribe();
  }

  async dejarDeEscuchar(
    channel: RealtimeChannel
  ) {
    await this.supabase.removeChannel(channel);
  }
}
