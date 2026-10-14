import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  correo = '';
  password = '';
  confirmarPassword = '';
  mensaje = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async registrar() {
    this.mensaje = '';

    if (!this.correo || !this.password || !this.confirmarPassword) {
      this.mensaje = 'Completa todos los campos.';
      return;
    }

    if (this.password !== this.confirmarPassword) {
      this.mensaje = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.password.length < 6) {
      this.mensaje = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    try {
      await this.authService.registrar(this.correo, this.password);
      await this.router.navigate(['/gestor-archivos']);
    } catch {
      this.mensaje = 'No se pudo registrar. Verifica el correo.';
    }
  }
}
