import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  mensaje = signal('');
  procesando = signal(false);

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async ingresar() {

    if (this.procesando()) {
      return;
    }

    this.mensaje.set('');

    if (!this.email || !this.password) {
      this.mensaje.set('Completa todos los campos');
      return;
    }

    this.procesando.set(true);

    try {
      const { error } = await this.auth.iniciarSesion(
        this.email,
        this.password
      );

      if (error) {
        const detalle = error.message.toLowerCase();
        this.mensaje.set(detalle.includes('email not confirmed')
          ? 'Confirma tu correo antes de iniciar sesión.'
          : detalle.includes('invalid login credentials')
            ? 'Correo o contraseña incorrectos. Si el registro fue rechazado por límite, vuelve a registrarte cuando se restablezca.'
            : error.message);
        return;
      }

      await this.router.navigate(['/inicio']);
    } catch (error) {
      this.mensaje.set(error instanceof Error
        ? error.message
        : 'No se pudo iniciar sesión. Inténtalo más tarde.');
    } finally {
      this.procesando.set(false);
    }

  }

  irRegistro() {
    this.router.navigate(['/registro']);
  }

}
