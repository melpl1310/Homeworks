import { Component } from '@angular/core';
import { ArbolBinario } from './arbol-binario/arbol-binario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ArbolBinario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}