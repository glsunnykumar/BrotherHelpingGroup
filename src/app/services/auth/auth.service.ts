import { inject, Injectable, signal } from '@angular/core';
import { Auth,
   signInWithEmailAndPassword, 
   updateProfile,
   signOut, 
   User, 
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   setPersistence,
   browserLocalPersistence} 
   from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   // 🔥 Signal to hold user
  userSignal = signal<User | null>(null);
   
   private currentUser = new BehaviorSubject<User | null>(null);
   user$ = this.currentUser.asObservable();

  constructor(private auth: Auth) {
       // Listen to Firebase auth changes
    onAuthStateChanged(this.auth, (user) => {
      console.log('Auth state changed:', user);
      this.userSignal.set(user);
      this.currentUser.next(user);
    });
  }

    // Helper computed state
  isLoggedIn = () => this.userSignal() !== null;

  async login(email: string, password: string) {
    try {
       // 🔥 THIS LINE IS THE KEY
       await setPersistence(this.auth, browserLocalPersistence);
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (err) {
      throw err;
    }
  }


   // ✅ Register Method
  async register(email: string, password: string, displayName?: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      // 🔥 Update display name if provided
      if (userCredential.user && displayName) {
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
      }

      // 🔥 Update signal
      this.userSignal.set(userCredential.user);

      return userCredential;

    } catch (error) {
      throw error; // pass error to component
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
