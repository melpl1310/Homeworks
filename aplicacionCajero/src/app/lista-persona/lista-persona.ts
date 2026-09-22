import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-persona',
  imports: [DatePipe],
  templateUrl: './lista-persona.html',
  styleUrl: './lista-persona.css'
})
export class ListaPersona {
  @Input() personas: any[] = [];
}