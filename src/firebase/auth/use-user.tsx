
'use client';

import { useState, useEffect } from 'react';
import { type User } from 'firebase/auth';
import { useAuth } from '../provider';

type UseUserReturn = {
  data: User | null;
  isLoading: boolean;
};

export function useUser(): UseUserReturn {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { data: user, isLoading };
}
