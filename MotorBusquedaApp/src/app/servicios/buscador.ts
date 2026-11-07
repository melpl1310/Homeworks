import { Injectable } from '@angular/core';

import { Producto } from '../modelos/producto';

import { Trie } from '../estructuras/trie';

import { MaxHeap } from '../estructuras/min-heap';

@Injectable({
  providedIn: 'root',
})
export class BuscadorService {
  private trie = new Trie();

  insert(product: Producto): void {
    this.trie.insert(product);
  }

  searchTopK(prefix: string, k: number): Producto[] {
    const products = this.trie.searchPrefix(prefix);

    if (products.length === 0 || !Number.isInteger(k) || k <= 0) {
      return [];
    }

    const heap = new MaxHeap();

    heap.heapify(products);

    const results: Producto[] = [];

    while (heap.size() > 0 && results.length < k) {
      const product = heap.pop();

      if (product) {
        results.push(product);
      }
    }

    return results;
  }
}
