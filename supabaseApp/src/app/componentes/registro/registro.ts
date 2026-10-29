import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  email = '';
  password = '';

  mensaje = signal('');
  procesando = signal(false);

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async registrar() {

    if (this.procesando()) {
      return;
    }

    this.mensaje.set('');

    if (!this.email || !this.password) {
      this.mensaje.set('Completa todos los campos');
      return;
    }

    if (this.password.length < 6) {
      this.mensaje.set(
        'La contraseña debe tener mínimo 6 caracteres'
      );
      return;
    }

    this.procesando.set(true);

    try {

      const { data, error } = await this.auth.registrar(
        this.email,
        this.password
      );

      if (error) {

        if (error.status === 429) {
          this.mensaje.set(
            'Se alcanzó el límite temporal de registros. Espera antes de volver a intentarlo.'
          );
        } else {
          this.mensaje.set(error.message);
        }

        return;
      }

      if (data.session) {

        await this.router.navigate(['/inicio']);

      } else {

        this.mensaje.set(
          'Registro exitoso. Revisa tu correo para confirmar tu cuenta.'
        );

      }

    } catch (error) {

      this.mensaje.set(
        error instanceof Error
          ? error.message
          : 'No se pudo completar el registro. Inténtalo más tarde.'
      );

    } finally {

      this.procesando.set(false);

    }
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

}
