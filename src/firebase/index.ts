import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getFirebaseConfig } from './config';

// Re-export the providers and hooks
export { FirebaseProvider, useFirebaseApp, useAuth, useFirestore, useFirebase } from './provider';
export { useUser } from './auth/use-user';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';


// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

export function initializeFirebase() {
  const firebaseConfig = getFirebaseConfig();
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (e) {
      console.error('Failed to initialize Firebase', e);
      throw e;
    }
  } else {
    app = getApp();
  }
  
  auth = getAuth(app);
  firestore = getFirestore(app);
  
  return { app, auth, firestore };
}
