// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './../services/auth/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  
  const authService = inject(AuthService);
   const router = inject(Router);
   
    return authService.user$.pipe(
    take(1), // 🔥 wait for first value
    map(user => {

      if (user) {
        return true;
      } else {
        router.navigate(['/home']); // or /login
        return false;
      }

    })
  );
};