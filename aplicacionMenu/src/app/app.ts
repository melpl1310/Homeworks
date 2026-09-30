import { Component } from '@angular/core';
import { ArbolMenu } from './arbol-menu/arbol-menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ArbolMenu],
  template: '<app-arbol-menu></app-arbol-menu>',
  styleUrl: './app.css'
})
export class App {}