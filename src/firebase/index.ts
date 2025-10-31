'use client';

import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { getFirebaseConfig } from './config';

export { FirebaseProvider, useFirebaseApp, useAuth, useFirestore, useFirebase } from './provider';
export { useUser } from './auth/use-user';
