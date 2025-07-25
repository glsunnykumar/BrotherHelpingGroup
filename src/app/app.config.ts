import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
     provideHttpClient(), 
     provideAnimationsAsync(),
     provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
     provideAuth(() => getAuth()),
     provideFirestore(() => getFirestore()),
       provideStorage(() => getStorage()),
    ]
};
