import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { auth } from '../app/firebaseConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  private authReady: Promise<User | null>;

  constructor() {
    this.authReady = new Promise((resolve) => {
      let firstChange = true;

      onAuthStateChanged(auth, (user) => {
        this.userSubject.next(user);

        if (firstChange) {
          firstChange = false;
          resolve(user);
        }
      });
    });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  logout() {
    return signOut(auth);
  }

  getCurrentUser() {
    return auth.currentUser;
  }

  async isAuthenticated(): Promise<boolean> {
    await this.authReady;
    return auth.currentUser !== null;
  }
}