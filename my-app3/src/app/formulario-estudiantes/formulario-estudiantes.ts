import { Component, Output, EventEmitter } from '@angular/core';

interface Student {
  name: string;
  age: number;
  code: string;
}

@Component({
  selector: 'app-formulario-estudiantes',
  imports: [],
  templateUrl: './formulario-estudiantes.html',
  styleUrl: './formulario-estudiantes.css'
})

export class FormularioEstudiantes {
  @Output() studentAdded = new EventEmitter<Student>();
  name = '';
  age = 0;
  code = '';

  addStudent() {
    if (this.name === '' || this.age <= 0 || this.code === '') {
      return;
    }

    const student: Student = {
      name: this.name,
      age: this.age,
      code: this.code
    };

    this.studentAdded.emit(student);
    this.name = '';
    this.age = 0;
    this.code = '';
  }

  changeName(event: any) {
    this.name = event.target.value;
  }

  changeAge(event: any) {
    this.age = Number(event.target.value);
  }

  changeCode(event: any) {
    this.code = event.target.value;
  }
}