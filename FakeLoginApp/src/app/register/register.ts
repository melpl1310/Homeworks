import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  email = '';
  password = '';
  confirmarPassword = '';
  error = '';
  cargando = false;

  constructor(private router: Router) {}

  async registrarse() {
    this.error = '';

    if (
      !this.email.trim() ||
      !this.password ||
      !this.confirmarPassword
    ) {
      this.error = 'Completa todos los campos.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.password !== this.confirmarPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    this.cargando = true;

    try {
      await createUserWithEmailAndPassword(
        auth,
        this.email.trim(),
        this.password
      );

      await this.router.navigate(['/tasks']);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.error = 'Este correo ya tiene una cuenta registrada.';
      } else if (error.code === 'auth/invalid-email') {
        this.error = 'El correo electrónico no es válido.';
      } else {
        this.error = 'No se pudo crear la cuenta. Intenta nuevamente.';
      }
    } finally {
      this.cargando = false;
    }
  }
}
