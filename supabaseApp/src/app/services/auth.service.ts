import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase;

  constructor(supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async registrar(email: string, password: string) {
    return await this.supabase.auth.signUp({
      email: email.trim(),
      password
    });
  }

  async iniciarSesion(correo: string, password: string) {
    return await this.supabase.auth.signInWithPassword({
      email: correo.trim(),
      password: password
    });
  }

  async cerrarSesion() {
    return await this.supabase.auth.signOut();
  }

  async actualizarMetadata(metadata: Record<string, unknown>) {
    return await this.supabase.auth.updateUser({ data: metadata });
  }

  async obtenerUsuario() {
    const { data, error } = await this.supabase.auth.getUser();

    if (error) {
      return null;
    }

    return data.user;
  }

  async obtenerSesion() {
    const { data, error } = await this.supabase.auth.getSession();

    if (error) {
      return null;
    }

    return data.session;
  }
}
