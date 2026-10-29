import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly avatarUrlCacheDuration = 55 * 60 * 1000;
  private supabase;

  constructor(supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async subirAvatar(archivo: File) {
    const { data: usuarioData, error: usuarioError } =
      await this.supabase.auth.getUser();

    if (usuarioError || !usuarioData.user) {
      throw new Error('Debes iniciar sesión.');
    }

    const tiposPermitidos = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif'
    ];

    if (!tiposPermitidos.includes(archivo.type)) {
      throw new Error('Selecciona una imagen JPG, PNG, WEBP o GIF.');
    }

    if (archivo.size > 2 * 1024 * 1024) {
      throw new Error('La imagen debe pesar máximo 2 MB.');
    }

    const usuarioId = usuarioData.user.id;
    const extension = archivo.name.split('.').pop() || 'jpg';
    const ruta = `${usuarioId}/${Date.now()}.${extension}`;

    const { data, error } = await this.supabase.storage
      .from('avatars')
      .upload(ruta, archivo, {
        upsert: false
      });

    if (error) {
      throw error;
    }

    return data.path;
  }

  async obtenerUrlAvatar(ruta: string) {
    const cacheKey = `avatar-url:${ruta}`;
    const expirationKey = `${cacheKey}:expires`;
    const cachedUrl = sessionStorage.getItem(cacheKey);
    const cachedExpiration = Number(sessionStorage.getItem(expirationKey));

    if (cachedUrl && cachedExpiration > Date.now()) {
      return cachedUrl;
    }

    sessionStorage.removeItem(cacheKey);
    sessionStorage.removeItem(expirationKey);

    const { data, error } = await this.supabase.storage
      .from('avatars')
      .createSignedUrl(ruta, 3600);

    if (error) {
      throw error;
    }

    sessionStorage.setItem(cacheKey, data.signedUrl);
    sessionStorage.setItem(
      expirationKey,
      String(Date.now() + this.avatarUrlCacheDuration)
    );

    return data.signedUrl;
  }
}
