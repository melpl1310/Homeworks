import { Producto } from '../modelos/producto';

export class MaxHeap {

  private heap: Producto[] = [];

  size(): number {
    return this.heap.length;
  }

  private swap(i: number, j: number): void {

    const temp = this.heap[i];

    this.heap[i] = this.heap[j];

    this.heap[j] = temp;
  }

  push(product: Producto): void {

    this.heap.push(product);

    this.percolateUp(this.heap.length - 1);
  }

  peek(): Producto | undefined {
    return this.heap[0];
  }

  pop(): Producto | undefined {

    if (this.heap.length === 0) {
      return undefined;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];

    this.heap[0] = this.heap.pop()!;

    this.percolateDown(0);

    return max;
  }

  private percolateUp(index: number): void {

    while (index > 0) {

      const parent = Math.floor((index - 1) / 2);

      if (
        this.heap[index].popularity >
        this.heap[parent].popularity
      ) {

        this.swap(index, parent);

        index = parent;

      } else {
        break;
      }
    }
  }

  private percolateDown(index: number): void {

    const length = this.heap.length;

    while (true) {

      let largest = index;

      const left = 2 * index + 1;

      const right = 2 * index + 2;

      if (
        left < length &&
        this.heap[left].popularity >
        this.heap[largest].popularity
      ) {
        largest = left;
      }

      if (
        right < length &&
        this.heap[right].popularity >
        this.heap[largest].popularity
      ) {
        largest = right;
      }

      if (largest === index) {
        break;
      }

      this.swap(index, largest);

      index = largest;
    }
  }

  heapify(products: Producto[]): void {

    this.heap = [...products];

    for (
      let i = Math.floor(this.heap.length / 2) - 1;
      i >= 0;
      i--
    ) {
      this.percolateDown(i);
    }
  }

  toArray(): Producto[] {
    return [...this.heap];
  }
}