import { Producto } from '../modelos/producto';

export class TrieNode {
  children: Map<string, TrieNode> = new Map();

  isEndOfWord: boolean = false;

  products: Producto[] = [];
}