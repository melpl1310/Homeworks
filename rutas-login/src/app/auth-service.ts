import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario = signal<string | null>(null);
  estaAutenticado = signal(false);

  login(email: string, password: string): boolean {
    if (email === 'user@mail.com' && password === '123') {
      this.usuario.set(email);
      this.estaAutenticado.set(true);
      return true;
    }

    return false;
  }

  logout(): void {
    this.usuario.set(null);
    this.estaAutenticado.set(false);
  }
}