'use client';

import { useLocalStorage } from './useLocalStorage';

export function useBookmarks() {
  const [bookmarks, setBookmarks, isInitialized] = useLocalStorage<string[]>(
    'hifaya_bookmarks',
    []
  );

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => {
    return bookmarks.includes(id);
  };

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    isInitialized,
  };
}
