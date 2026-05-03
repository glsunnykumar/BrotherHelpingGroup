import { Injectable, signal, computed } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { fromEventPattern } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 🔥 Signal (MAIN STATE)
  userSignal = signal<User | null>(null);

  // 🔥 Observable (for guards / async pipe)
  user$: Observable<User | null>;

  constructor(private auth: Auth) {

    // 🔥 Convert Firebase listener → Observable
    this.user$ = fromEventPattern<User | null>(
      (handler) => onAuthStateChanged(this.auth, handler),
      (_, unsubscribe) => unsubscribe()
    );

    // 🔥 Sync signal with Firebase
    this.user$.subscribe(user => {
      console.log('🔥 Auth State Changed:', user);
      this.userSignal.set(user);
    });

  }

  // ✅ Computed state
  isLoggedIn = computed(() => this.userSignal() !== null);

  // 🔐 LOGIN
  async login(email: string, password: string) {

    await setPersistence(this.auth, browserLocalPersistence);

    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // 🆕 REGISTER
  async register(email: string, password: string, displayName?: string) {

    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName
      });
    }

    return userCredential;
  }

  // 🚪 LOGOUT
  async logout() {
    await signOut(this.auth);
  }

  // 👤 CURRENT USER (sync access if needed)
  getCurrentUser() {
    return this.userSignal();
  }

}