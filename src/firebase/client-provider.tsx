
'use client';

import {
  useState,
  useEffect,
  type ReactNode,
  type ComponentProps,
} from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from '.';
import type { FirebaseApp } from 'firebase/app';
import type { Auth, User } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

type FirebaseProviderProps = Omit<
  ComponentProps<typeof FirebaseProvider>,
  'children'
>;

function isFirebaseConfigured() {
  return !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'demo';
}

function createDemoAuth(): Auth {
  let currentUser: User | null = null;
  const listeners: ((user: User | null) => void)[] = [];

  const broadcastUser = () => {
    listeners.forEach((listener) => listener(currentUser));
  }

  return {
    currentUser,
    onAuthStateChanged: (listener: (user: User | null) => void) => {
      listeners.push(listener);
      // Immediately invoke with current state
      Promise.resolve().then(() => listener(currentUser));
      return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      };
    },
    signInWithEmailAndPassword: async (email, password) => {
      console.log('Demo sign in with:', email, password);
      currentUser = {
        uid: 'demo-user-123',
        email: email,
        displayName: 'Demo User',
        photoURL: null,
      } as User;
      broadcastUser();
      return { user: currentUser };
    },
    createUserWithEmailAndPassword: async (email, password) => {
      console.log('Demo create user with:', email, password);
      currentUser = {
        uid: 'demo-user-123',
        email: email,
        displayName: 'New Demo User',
        photoURL: null,
      } as User;
       broadcastUser();
      return { user: currentUser };
    },
    signOut: async () => {
      console.log('Demo sign out');
      currentUser = null;
       broadcastUser();
    },
    sendPasswordResetEmail: async (email) => {
       console.log('Demo password reset for:', email);
       return Promise.resolve();
    },
    updateProfile: async (user, profile) => {
      if(user) {
        user.displayName = profile.displayName ?? user.displayName;
        currentUser = user;
        broadcastUser();
      }
      return Promise.resolve();
    }
  } as unknown as Auth;
}


function createDemoFirestore(): Firestore {
  const mockDoc = (path: string) => ({
    path,
    withConverter: () => mockDoc(path),
  });
  
  const mockSetDoc = async (docRef: any, data: any) => {
    console.log(`Demo Firestore: Setting doc at ${docRef.path} with`, data);
    return Promise.resolve();
  }

  return {
    app: {} as FirebaseApp,
    type: 'firestore',
    toJSON: () => ({}),
    doc: mockDoc,
    setDoc: mockSetDoc,
  } as unknown as Firestore;
}

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [firebase, setFirebase] = useState<FirebaseProviderProps | null>(null);

  useEffect(() => {
    if (isFirebaseConfigured()) {
      try {
        const { app, auth, firestore } = initializeFirebase();
        setFirebase({ app, auth, firestore });
      } catch (error) {
        console.error("Firebase initialization failed, falling back to demo mode.", error);
        // Fallback to demo mode on initialization error
        setFirebase({
          app: {} as FirebaseApp,
          auth: createDemoAuth(),
          firestore: createDemoFirestore(),
        });
      }
    } else {
      // Use demo mode if Firebase is not configured
      console.log(
        'Firebase not configured. Using demo mode. Set NEXT_PUBLIC_FIREBASE_API_KEY to enable.'
      );
      setFirebase({
        app: {} as FirebaseApp,
        auth: createDemoAuth(),
        firestore: createDemoFirestore(),
      });
    }
  }, []);

  if (!firebase) {
    // Show a loading indicator while Firebase is initializing
    return <div className="flex h-screen w-screen items-center justify-center">Loading Firebase...</div>;
  }

  return <FirebaseProvider {...firebase}>{children}</FirebaseProvider>;
}
