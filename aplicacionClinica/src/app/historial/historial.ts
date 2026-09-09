import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-historial',
  imports: [],
  templateUrl: './historial.html',
  styleUrl: './historial.css'
})
export class Historial {

  @Input() historial: any[] = [];

}