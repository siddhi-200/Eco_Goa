'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { getFirebaseConfig } from './config';

type FirebaseContextValue = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined
);

export function initializeFirebase(): FirebaseContextValue {
  const firebaseConfig = getFirebaseConfig();
  const apps = getApps();
  const app = apps.length ? apps[0] : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore };
}

export function FirebaseProvider({
  app,
  auth,
  firestore,
  children,
}: {
  children: ReactNode;
} & FirebaseContextValue) {
  const value = useMemo(
    () => ({ app, auth, firestore }),
    [app, auth, firestore]
  );

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

export function useFirebaseApp() {
  return useFirebase().app;
}

export function useAuth() {
  return useFirebase().auth;
}

export function useFirestore() {
  return useFirebase().firestore;
}
