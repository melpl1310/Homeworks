import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Student {
  name: string;
  age: number;
  code: string;
}

@Component({
  selector: 'app-lista-estudiantes',
  imports: [],
  templateUrl: './lista-estudiantes.html',
  styleUrl: './lista-estudiantes.css'
})
export class ListaEstudiantes {

  @Input() students: Student[] = [];
  @Output() studentDeleted = new EventEmitter<string>();
  deleteStudent(code: string) {
    this.studentDeleted.emit(code);
  }
}