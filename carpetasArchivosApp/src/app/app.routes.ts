// src/app/app.routes.ts

import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth';

import { Login } from './login/login';
import { Register } from './register/register';
import { GestorArchivos } from './gestor-archivos/gestor-archivos';

export const routesApp: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'gestor-archivos',
    component: GestorArchivos,
    canActivate: [
      async () => {
        const authService = inject(AuthService);
        const router = inject(Router);
        const usuario = await authService.esperarUsuario();

        return usuario ? true : router.createUrlTree(['/login']);
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];