'use client';

import {
  useState,
  useEffect,
  type ReactNode,
  type ComponentProps,
} from 'react';
import { FirebaseProvider, initializeFirebase } from '@/firebase';
import type { FirebaseApp } from 'firebase/app';
import type { Auth, User, UserCredential } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

// --- Mock Firebase Implementation ---
const mockUser: User = {
  uid: 'mock-user-id',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: 'https://picsum.photos/seed/1/100/100',
  providerId: 'password',
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: new Date().toUTCString(),
    lastSignInTime: new Date().toUTCString(),
  },
  providerData: [],
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => 'mock-token',
  getIdTokenResult: async () => ({
    token: 'mock-token',
    expirationTime: new Date(Date.now() + 3600 * 1000).toISOString(),
    authTime: new Date().toISOString(),
    issuedAtTime: new Date().toISOString(),
    signInProvider: 'password',
    signInSecondFactor: null,
    claims: {},
  }),
  reload: async () => {},
  toJSON: () => ({}),
};

const mockAuth = {
  currentUser: mockUser,
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    // Immediately call back with the mock user
    setTimeout(() => callback(mockUser), 100);
    // Return a dummy unsubscribe function
    return () => {};
  },
  signInWithEmailAndPassword: async (): Promise<UserCredential> => ({ user: mockUser, providerId: null, operationType: 'signIn' }),
  createUserWithEmailAndPassword: async (): Promise<UserCredential> => ({ user: mockUser, providerId: null, operationType: 'signIn' }),
  signOut: async () => {
    // In a real app this would clear the user
    // For mock, we can just log it
    console.log('Mock sign out');
    // To simulate logout, we can tell listeners the user is null
    // This part is tricky as we'd need to manage the callback.
    // For now, a page refresh will bring the mock user back.
  },
  updateProfile: async () => {},
} as unknown as Auth;

const mockFirestore = {
  // Add mock firestore methods if needed for reads/writes in demo mode
  collection: () => ({
    doc: () => ({
      set: async () => {},
      get: async () => ({ exists: () => true, data: () => ({})})
    })
  }),
  doc: () => ({
    set: async () => {},
    get: async () => ({ exists: () => true, data: () => ({})})
  })
} as unknown as Firestore;

const mockApp = {} as FirebaseApp;
// --- End Mock Firebase Implementation ---


type FirebaseProviderProps = Omit<
  ComponentProps<typeof FirebaseProvider>,
  'children'
>;

function isFirebaseConfigured() {
  // A simple check to see if the main API key is present and not a placeholder
  return (
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'your-api-key'
  );
}


export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [firebase, setFirebase] = useState<FirebaseProviderProps | null>(null);

  useEffect(() => {
    if (isFirebaseConfigured()) {
      const { app, auth, firestore } = initializeFirebase();
      setFirebase({ app, auth, firestore });
    } else {
      // Use mock Firebase if not configured
      console.log("Using mock Firebase services for demo.");
      setFirebase({
        app: mockApp,
        auth: mockAuth,
        firestore: mockFirestore,
      });
    }
  }, []);

  if (!firebase) {
    // This will be very brief, but prevents children from rendering without a provider
    return null;
  }

  return <FirebaseProvider {...firebase}>{children}</FirebaseProvider>;
}
