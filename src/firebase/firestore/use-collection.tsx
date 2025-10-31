'use client';

import {
  onSnapshot,
  query,
  where,
  type DocumentData,
  type Query,
  collection,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useFirestore } from '@/firebase/provider';
import type { FirebaseError } from 'firebase/app';

export function useCollection<T>(collectionName: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<FirebaseError | null>(null);

  useEffect(() => {
    if (!firestore) return;
    const q = query(collection(firestore, collectionName));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const data: T[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as T);
        });
        setData(data);
      },
      (error) => {
        setError(error);
      }
    );
    return () => unsubscribe();
  }, [firestore, collectionName]);

  return { data, error };
}
