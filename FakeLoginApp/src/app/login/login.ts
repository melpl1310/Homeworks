import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  error = '';
  cargando = false;

  constructor(private router: Router) {}

  async iniciarSesion() {
    this.error = '';

    if (!this.email.trim() || !this.password) {
      this.error = 'Completa todos los campos.';
      return;
    }

    this.cargando = true;

    try {
      await signInWithEmailAndPassword(
        auth,
        this.email.trim(),
        this.password
      );

      await this.router.navigate(['/tasks']);
    } catch (error: any) {
      this.error = 'No se pudo iniciar sesión. Verifica tus datos.';
    } finally {
      this.cargando = false;
    }
  }
}