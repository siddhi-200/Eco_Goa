'use client';

import {
  useState,
  useEffect,
  type ReactNode,
  type ComponentProps,
} from 'react';
import { FirebaseProvider, initializeFirebase } from '.';

type FirebaseProviderProps = Omit<
  ComponentProps<typeof FirebaseProvider>,
  'children'
>;

function isFirebaseConfigured() {
  const config = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  return config && config !== 'replace-with-your-api-key';
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
    // If Firebase is not configured, we render a message and disable the app.
    if (process.env.NODE_ENV !== 'production') {
      return (
          <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fef2f2', color: '#991b1b' }}>
              <h1>Firebase Not Configured</h1>
              <p>Your Firebase environment variables are not set. Please add them to your <code>.env</code> file.</p>
              <p>The application will not function correctly without them.</p>
          </div>
      );
    }
    // In production, we don't want to expose this. We'll just show a generic error or a blank page.
    return null;
  }

  if (!firebase) {
    // You can show a loading indicator here
    return null; 
  }

  return <FirebaseProvider {...firebase}>{children}</FirebaseProvider>;
}
