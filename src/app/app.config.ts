import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { provideFunctions, getFunctions } from '@angular/fire/functions'; // 👈 Agregado para usar Firebase Functions

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "prueba-ec7f2",
        appId: "1:135021971897:web:1bd7c175bbdf4a62814e68",
        storageBucket: "prueba-ec7f2.firebasestorage.app",
        apiKey: "AIzaSyA5zHGJFXf3ZZTU_bLf8S9NCzatgX8k2Fk",
        authDomain: "prueba-ec7f2.firebaseapp.com",
        messagingSenderId: "135021971897"
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideFunctions(() => getFunctions()) // 👈 Aquí habilitamos Cloud Functions
  ]
};
