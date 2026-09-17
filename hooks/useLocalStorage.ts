'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('local-storage-update', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('local-storage-update', callback);
  };
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, boolean] {
  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') {
      return JSON.stringify(initialValue);
    }
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? item : JSON.stringify(initialValue);
    } catch {
      return JSON.stringify(initialValue);
    }
  }, [key, initialValue]);

  const getServerSnapshot = useCallback(() => {
    return JSON.stringify(initialValue);
  }, [initialValue]);

  const rawValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo(() => {
    try {
      return JSON.parse(rawValue) as T;
    } catch {
      return initialValue;
    }
  }, [rawValue, initialValue]);

  const setValue = useCallback(
    (updater: T | ((val: T) => T)) => {
      try {
        const currentItem =
          typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
        const currentParsed: T = currentItem !== null ? JSON.parse(currentItem) : initialValue;
        const valueToStore = updater instanceof Function ? updater(currentParsed) : updater;

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          window.dispatchEvent(new Event('local-storage-update'));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, initialValue]
  );

  return [value, setValue, true];
}
