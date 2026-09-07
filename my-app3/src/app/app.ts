import { Component, signal } from '@angular/core';
import { FormularioEstudiantes } from './formulario-estudiantes/formulario-estudiantes';
import { ListaEstudiantes } from './lista-estudiantes/lista-estudiantes';

class Student {
  name: string;
  age: number;
  code: string;

  constructor(name: string, age: number, code: string) {
    this.name = name;
    this.age = age;
    this.code = code;
  }
}

class Node {
  student: Student;
  next: Node | null;

  constructor(student: Student) {
    this.student = student;
    this.next = null;
  }
}

class LinkedList {
  head: Node | null;
  tail: Node | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(student: Student) {
    const newNode = new Node(student);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  remove(code: string) {
    if (this.head === null) {
      return;
    }

    if (this.head.student.code === code) {
      this.head = this.head.next;
      this.length--;
      if (this.head === null) {
        this.tail = null;
      }
      return;
    }

    let current = this.head;

    while (current.next !== null) {
      if (current.next.student.code === code) {
        current.next = current.next.next;
        if (current.next === null) {
          this.tail = current;
        }
        this.length--;
        return;
      }

      current = current.next;
    }
  }

  toArray(): Student[] {
    const students: Student[] = [];
    let current = this.head;
    while (current !== null) {
      students.push(current.student);
      current = current.next;
    }

    return students;
  }
}

@Component({
  selector: 'app-root',
  imports: [FormularioEstudiantes, ListaEstudiantes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

studentList = new LinkedList();
students = signal<Student[]>([]);

constructor() {
  this.addStudent({
    name: 'Adri',
    age: 20,
    code: 'A001'
  });

  this.addStudent({
    name: 'Mel',
    age: 19,
    code: 'A002'
  });
}

  addStudent(student: Student) {
    this.studentList.append(student);
    this.students.set(
      this.studentList.toArray()
    );
  }

  deleteStudent(code: string) {
    this.studentList.remove(code);
    this.students.set(
      this.studentList.toArray()
    );
  }
}