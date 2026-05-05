import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/auth-context';

export function usePersistedState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const { appState, isHydrating, session, setAppStateValue } = useAuth();
  const didSkipInitialPersist = useRef(false);

  useEffect(() => {
    const remoteValue = appState[key] as T | undefined;
    setValue(remoteValue ?? initialValue);
  }, [appState, initialValue, key]);

  useEffect(() => {
    if (isHydrating || !session) {
      return;
    }

    if (!didSkipInitialPersist.current) {
      didSkipInitialPersist.current = true;
      return;
    }

    void setAppStateValue(key, value);
  }, [isHydrating, key, session, setAppStateValue, value]);

  useEffect(() => {
    didSkipInitialPersist.current = false;
  }, [key, session?.user.id]);

  return [value, setValue] as const;
}