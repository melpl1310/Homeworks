import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Tareas } from '../tareas/tareas';
import { Realtime } from '../realtime/realtime';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Tareas, Realtime],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {

  usuario = signal<any>(null);
  avatarUrl = signal('');
  mensaje = signal('');

  constructor(
    private auth: AuthService,
    private storage: StorageService,
    private router: Router
  ) {}

  async ngOnInit() {

    const sesion = await this.auth.obtenerSesion();
    const usuario = sesion?.user ?? null;
    this.usuario.set(usuario);

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    const rutaAvatar = usuario.user_metadata?.['avatar_path'];

    if (rutaAvatar) {
      try {
        this.avatarUrl.set(await this.storage.obtenerUrlAvatar(rutaAvatar));
      } catch (error) {
        this.mensaje.set(error instanceof Error
          ? error.message
          : 'No se pudo cargar la foto de perfil');
      }
    } else {
      this.avatarUrl.set(usuario.user_metadata?.['avatar_url'] || '');
    }

  }

  // Subir avatar
  async subirAvatar(event: Event) {

    const archivo =
      (event.target as HTMLInputElement).files?.[0];

    if (!archivo || !this.usuario()) {
      return;
    }

    this.mensaje.set('');
    let ruta: string;
    let nuevaAvatarUrl: string;

    try {
      ruta = await this.storage.subirAvatar(archivo);
      nuevaAvatarUrl = await this.storage.obtenerUrlAvatar(ruta);
    } catch (error) {
      this.mensaje.set(error instanceof Error
        ? error.message
        : 'No se pudo subir la foto de perfil');
      return;
    }

    const { error: errorPerfil } =
      await this.auth.actualizarMetadata({ avatar_path: ruta });

    if (errorPerfil) {
      this.mensaje.set(errorPerfil.message);
      return;
    }

    this.avatarUrl.set(nuevaAvatarUrl);
    this.mensaje.set('Foto de perfil actualizada');

  }

  // Cerrar sesión
  async cerrarSesion() {

    const { error } = await this.auth.cerrarSesion();

    if (error) {
      this.mensaje.set('No se pudo cerrar la sesión');
      return;
    }

    this.router.navigate(['/login']);

  }

}
