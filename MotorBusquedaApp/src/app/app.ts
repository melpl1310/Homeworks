import { Component } from '@angular/core';
import { BuscadorComponent } from './buscador/buscador';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BuscadorComponent],
  template: `<app-buscador></app-buscador>`,
  styleUrl: './app.css'
})
export class App {
}