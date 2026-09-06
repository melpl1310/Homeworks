import { Routes } from '@angular/router';

import { Musica } from './musica/musica';
import { Navegador } from './navegador/navegador';


export const routes: Routes = [

  {
    path: '',
    component: Musica
  },

  {
    path: 'navegador',
    component: Navegador
  }

];