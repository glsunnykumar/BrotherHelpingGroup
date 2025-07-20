import { inject, Injectable } from '@angular/core';
import { Auth,
   signInWithEmailAndPassword, 
   updateProfile,
   GoogleAuthProvider,
   signInWithPopup,
   signOut, 
   User, 
   createUserWithEmailAndPassword,
   onAuthStateChanged} 
   from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router'; 
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   
   private currentUser = new BehaviorSubject<User | null>(null);
   user$ = this.currentUser.asObservable();

  constructor(private auth: Auth) {
       onAuthStateChanged(this.auth, (user) => {
      this.currentUser.next(user);
    });
  }


  async login(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (err) {
      throw err;
    }
  }


  

   // Logout Admin
     logout() {
    return signOut(this.auth);
  }

  getCurrentUser() {
    return this.currentUser.value;
  }
}
