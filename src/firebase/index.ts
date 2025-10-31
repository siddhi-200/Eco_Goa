import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getFirebaseConfig } from './config';

import { FirebaseClientProvider } from './client-provider';
import {
  FirebaseProvider,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
} from './provider';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { useUser } from './auth/use-user';

function initializeFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  const apps = getApps();
  const app = apps.length > 0 ? apps[0] : initializeApp(getFirebaseConfig());
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return { app, auth, firestore };
}

export {
  // Initialization
  initializeFirebase,
  // Providers
  FirebaseClientProvider,
  FirebaseProvider,
  // Top-level hooks
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
  // Auth hooks
  useUser,
  // Firestore hooks
  useCollection,
  useDoc,
};
