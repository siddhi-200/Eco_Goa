'use client';

import {
  useState,
  useEffect,
  type ReactNode,
  type ComponentProps,
} from 'react';
import { FirebaseProvider, initializeFirebase } from '@/firebase';

type FirebaseProviderProps = Omit<
  ComponentProps<typeof FirebaseProvider>,
  'children'
>;

function isFirebaseConfigured() {
  return !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
}


export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [firebase, setFirebase] = useState<FirebaseProviderProps | null>(null);

  const configured = isFirebaseConfigured();

  useEffect(() => {
    if (configured) {
      const { app, auth, firestore } = initializeFirebase();
      setFirebase({ app, auth, firestore });
    }
  }, [configured]);

  if (!configured) {
    // If Firebase is not configured, just render the children.
    // Auth-gated pages will redirect to /login, which doesn't need Firebase.
    return <>{children}</>;
  }

  if (!firebase) {
    // Show a loading indicator or a placeholder while Firebase is initializing
    return null;
  }

  return <FirebaseProvider {...firebase}>{children}</FirebaseProvider>;
}
