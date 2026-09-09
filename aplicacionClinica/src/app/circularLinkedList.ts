export class CircularNode {
  value: any;
  next: CircularNode | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

export class CircularLinkedList {
  head: CircularNode | null;
  tail: CircularNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any) {
    const newNode = new CircularNode(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this.head;
      this.tail!.next = newNode;
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