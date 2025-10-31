'use client';

import type { DocumentReference, DocumentData } from 'firebase/firestore';
import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase/provider';

export function useDoc<T>(path: string, docId: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!firestore) return;
    const docRef = doc(firestore, path, docId);
    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        if (doc.exists()) {
          setData({ id: doc.id, ...doc.data() } as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, path, docId]);

  return { data, loading, error };
}
