import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  correo = '';
  password = '';
  mensaje = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async iniciarSesion() {
    this.mensaje = '';

    if (!this.correo || !this.password) {
      this.mensaje = 'Completa todos los campos.';
      return;
    }

    try {
      await this.authService.iniciarSesion(
        this.correo,
        this.password
      );

      await this.router.navigate(['/gestor-archivos']);
    } catch {
      this.mensaje = 'Correo o contraseña incorrectos.';
    }
  }
}