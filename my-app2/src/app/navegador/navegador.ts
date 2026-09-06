import { Component, signal, ElementRef, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

class PageNode {

  value: string;
  next: PageNode | null = null;
  prev: PageNode | null = null;
  constructor(value: string) {
    this.value = value;
  }
}

class DoublyLinkedList {

  head: PageNode | null = null;
  tail: PageNode | null = null;
  length = 0;

  append(value: string): void {
    const newNode = new PageNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {

      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
  }

  peek(
    value: string,
    current: PageNode | null = this.head
  ): PageNode | null {

    while (current) {
      if (
        current.value.toLowerCase() ===
        value.toLowerCase()
      ) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  size(): number {
    return this.length;
  }

  remove(value: string): void {

    let current = this.head;
    while (current) {
      if (current.value === value) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }

        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }
        this.length--;
        return;
      }
      current = current.next;
    }
  }

  print(): PageNode[] {

    const pages: PageNode[] = [];
    let current = this.head;
    while (current) {
      pages.push(current);
      current = current.next;
    }
    return pages;
  }
}

const STORAGE_KEY = 'navegador-paginas';

@Component({
  selector: 'app-navegador',
  imports: [],
  templateUrl: './navegador.html',
  styleUrl: './navegador.css'
})
export class Navegador {

  @ViewChild('tabsBar') tabsBar?: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private history = new DoublyLinkedList();

  pages = signal<PageNode[]>([]);
  currentPage = signal<PageNode | null>(null);
  searched = signal(false);
  searchFound = signal(false);
  showAddPage = signal(false);

  constructor() {
    const storedNames = this.loadPages();
    if (storedNames && storedNames.length > 0) {
      storedNames.forEach(name => {
        this.history.append(name);
      });

    } else {
      [
        'Google',
        'YouTube',
        'GitHub',
        'Spotify',
        'Angular'
      ].forEach(name => {
        this.history.append(name);
      });
    }
    this.currentPage.set(
      this.history.head
    );
    this.pages.set(
      this.history.print()
    );
  }

  private savePages(): void {

    if (!this.isBrowser) {
      return;
    }
    const names = this.history.print().map(p => p.value);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
  }

  private loadPages(): string[] | null {
    if (!this.isBrowser) {
      return null;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as string[];
    } catch {
      return null;
    }
  }

  goBack(): void {
    const current = this.currentPage();
    if (!current) {
      return;
    }
    if (current.prev) {

      this.currentPage.set(
        current.prev
      );
    }
  }
  goForward(): void {
    const current = this.currentPage();
    if (!current) {
      return;
    }
    if (current.next) {
      this.currentPage.set(
        current.next
      );
    }
  }
  canGoBack(): boolean {
    const current = this.currentPage();
    return current !== null && current.prev !== null;
  }

  canGoForward(): boolean {
    const current = this.currentPage();
    return current !== null && current.next !== null;
  }
  currentIndex(): number {
    const current = this.currentPage();
    if (!current) {
      return 0;
    }
    return this.pages().indexOf(current) + 1;
  }

  addPage(name: string): void {
    const cleanName = name.trim();
    if (cleanName === '') {
      return;
    }
    if (this.history.peek(cleanName)) {
      return;
    }
    this.history.append(cleanName);
    this.pages.set(
      this.history.print()
    );
    this.currentPage.set(
      this.history.tail
    );
    this.savePages();
    setTimeout(() => {
      if (this.tabsBar) {
        const el = this.tabsBar.nativeElement;
        el.scrollLeft = el.scrollWidth;
      }
    });
  }
  removePage(name: string): void {
    const page = this.history.peek(name);
    if (!page) {
      return;
    }
    const wasCurrent = page === this.currentPage();
    const fallback = page.next ?? page.prev;
    this.history.remove(name);
    this.pages.set(
      this.history.print()
    );
    if (wasCurrent) {
      this.currentPage.set(
        fallback
      );
    }
    this.savePages();
  }

  searchPage(name: string): void {
    const cleanName = name.trim();
    if (cleanName === '') {
      return;
    }
    this.searched.set(true);
    const found = this.history.peek(cleanName);
    if (found) {
      this.currentPage.set(found);
      this.searchFound.set(true);
    } else {
      this.searchFound.set(false);
    }
  }

  goToPage(page: PageNode): void {
    this.currentPage.set(page);
    this.searched.set(false);
  }
}