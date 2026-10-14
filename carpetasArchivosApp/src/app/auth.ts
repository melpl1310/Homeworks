import { Injectable, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from './firebaseConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario = signal<User | null>(null);
  cargando = signal(true);

  constructor() {
    onAuthStateChanged(auth, usuario => {
      this.usuario.set(usuario);
      this.cargando.set(false);
    });
  }

  registrar(correo: string, password: string) {
    return createUserWithEmailAndPassword(auth, correo, password);
  }

  iniciarSesion(correo: string, password: string) {
    return signInWithEmailAndPassword(auth, correo, password);
  }

  cerrarSesion() {
    return signOut(auth);
  }

  obtenerUsuario() {
    return auth.currentUser;
  }

  async esperarUsuario(): Promise<User | null> {
    if (!this.cargando()) {
      return this.usuario();
    }

    return new Promise(resolve => {
      const revisar = onAuthStateChanged(auth, usuario => {
        revisar();
        resolve(usuario);
      });
    });
  }
}