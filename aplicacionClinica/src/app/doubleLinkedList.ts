export class Node {
  value: any;
  next: Node | null;
  previous: Node | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

export class DoubleLinkedList {
  head: Node | null;
  tail: Node | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any): void {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.previous = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  peek(index: number): Node | null {
    let current = this.head;
    let count = 0;

    while (current !== null && count < index) {
      current = current.next;
      count++;
    }
    return current;
  }

  size(): number {
    return this.length;
  }

  remove(index: number): void {
    if (this.head === null) {
        return;
    }

    let current: Node | null = this.head;
    let count = 0;

    while (current !== null && count < index) {
        current = current.next;
        count++;
    }

    if (current === null) {
        return;
    }
    if (current.previous !== null) {
        current.previous.next = current.next;
    } else {
        this.head = current.next;
    }
    if (current.next !== null) {
        current.next.previous = current.previous;
    } else {
        this.tail = current.previous;
    }

    this.length--;
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
}