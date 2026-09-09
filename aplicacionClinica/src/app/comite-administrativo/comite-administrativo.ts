import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comite-administrativo',
  imports: [],
  templateUrl: './comite-administrativo.html',
  styleUrl: './comite-administrativo.css'
})
export class ComiteAdministrativo {

  @Input() comite: any[] = []
}