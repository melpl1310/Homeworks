import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  mensaje = '';

  iniciarSesion(email: string, password: string): void {
    const correcto = this.authService.login(email, password);

    if (correcto) {
      this.mensaje = '';
      this.router.navigate(['/inicio']);
    } else {
      this.mensaje = 'Correo o contraseña incorrectos.';
    }
  }
}