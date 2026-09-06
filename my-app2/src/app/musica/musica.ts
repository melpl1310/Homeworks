import { Component, signal } from '@angular/core';

class SongNode {

  value: string;
  next: SongNode | null = null;
  constructor(value: string) {
    this.value = value;
  }
}

class LinkedList {

  head: SongNode | null = null;
  tail: SongNode | null = null;
  length = 0;

  append(value: string): void {
    const newNode = new SongNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  peek(value: string, current: SongNode | null = this.head): SongNode | null {
    while (current) {
      if (current.value === value) {
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
    if (!this.head) {
      return;
    }
    if (this.head.value === value) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      this.length--;
      return;
    }
    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
      if (!current.next) {
        this.tail = current;
      }
      this.length--;
    }
  }

  print(): SongNode[] {
    const songs: SongNode[] = [];
    let current = this.head;
    while (current) {
      songs.push(current);
      current = current.next;
    }
    return songs;
  }

}

@Component({
  selector: 'app-musica',
  imports: [],
  templateUrl: './musica.html',
  styleUrl: './musica.css'
})

export class Musica {
  private playlist = new LinkedList();
  songs = signal<SongNode[]>([]);
  currentSong = signal<SongNode | null>(null);
  peekedSong = signal<SongNode | null>(null);
  searched = signal(false);
  constructor() {
    [
      'Golden',
      'Blinding Lights',
      'As It Was',
      'Cruel Summer',
      'Sweater Weather'
    ].forEach(title => this.playlist.append(title));
    this.currentSong.set(this.playlist.head);
    this.songs.set(this.playlist.print());
  }

  nextSong(): void {
    const current = this.currentSong();
    if (current && current.next) {
      this.currentSong.set(current.next);
    }
  }

  addSong(title: string): void {
    if (title.trim() === '') {
      return;
    }
    if (this.playlist.peek(title)) {
      return;
    }
    this.playlist.append(title);
    this.songs.set(this.playlist.print());
    if (!this.currentSong()) {
      this.currentSong.set(this.playlist.head);
    }
  }

  removeSong(title: string): void {
    const song = this.playlist.peek(title);
    if (!song) {
      return;
    }
    const wasCurrent = song === this.currentSong();
    const fallback = song.next;
    this.playlist.remove(title);
    this.songs.set(this.playlist.print());
    if (wasCurrent) {
      this.currentSong.set(fallback ?? this.playlist.head);
    }
  }

    searchSong(title: string): void {
    this.searched.set(true);
    const found = this.playlist.peek(title);
    this.peekedSong.set(found);
    if (found) {
      this.currentSong.set(found);
    }
  }
}