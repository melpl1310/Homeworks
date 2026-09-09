export class CircularDoubleNode {
  value: any;
  next: CircularDoubleNode | null;
  previous: CircularDoubleNode | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

export class CircularDoubleLinkedList {
  head: CircularDoubleNode | null;
  tail: CircularDoubleNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any) {
    const newNode = new CircularDoubleNode(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;

      newNode.next = newNode;
      newNode.previous = newNode;
    } else {
      newNode.previous = this.tail;
      newNode.next = this.head;

      this.tail!.next = newNode;
      this.head!.previous = newNode;

      this.tail = newNode;
    }

    this.length++;
  }

  print() {
    const values: any[] = [];

    if (this.head === null) {
      return values;
    }

    let current = this.head;

    do {
      values.push(current.value);
      current = current.next!;
    } while (current !== this.head);

    return values;
  }
}