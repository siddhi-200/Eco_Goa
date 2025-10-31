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
    // If Firebase is not configured, we can show a message or nothing.
    // The AppShell logic will handle redirects for protected pages.
    // For now, just render children to allow public pages to work.
    return <>{children}</>;
  }

  if (!firebase) {
    // Show a loading indicator while Firebase is initializing
    return (
       <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return <FirebaseProvider {...firebase}>{children}</FirebaseProvider>;
}
