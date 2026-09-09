export class Node {
  value: any;
  next: Node | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {

  head: Node | null;
  tail: Node | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any) {

    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;

    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  remove(index: number) {
    if (this.head === null) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      this.length--;
      if (this.length === 0) {
        this.tail = null;
      }

      return;
    }

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      if (current.next === null) {
        return;
      }
      current = current.next;
    }

    if (current.next !== null) {
      current.next = current.next.next;
      this.length--;

    }
  }

  print() {
    const values: any[] = [];
    let current = this.head;
    while (current !== null) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }
  size() {
    return this.length;
  }
}