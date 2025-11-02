
import { FirebaseOptions } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function getFirebaseConfig() {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'demo') {
    // This check is for the demo mode. If you have real credentials,
    // it will throw an error if they are not found.
    throw new Error('Missing or invalid Firebase configuration. Please ensure your .env.local file is set up correctly.');
  }
  return firebaseConfig;
}
