import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Inicio } from './inicio/inicio';
import { ArbolMenu } from './arbol-menu/arbol-menu';
import { ArbolBinario } from './arbol-binario/arbol-binario';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'inicio',
    component: Inicio,
    canActivate: [authGuard]
  },

  {
    path: 'arbol-menu',
    component: ArbolMenu,
    canActivate: [authGuard]
  },

  {
    path: 'arbol-binario',
    component: ArbolBinario,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];