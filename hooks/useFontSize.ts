'use client';

import { useLocalStorage } from './useLocalStorage';

export type FontScale = 'normal' | 'large' | 'xl';

export function useFontSize() {
  const [scale, setScale, isInitialized] = useLocalStorage<FontScale>(
    'hifaya_font_scale',
    'normal'
  );

  const increase = () => {
    setScale((prev) => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'xl';
      return 'xl';
    });
  };

  const decrease = () => {
    setScale((prev) => {
      if (prev === 'xl') return 'large';
      if (prev === 'large') return 'normal';
      return 'normal';
    });
  };

  const reset = () => {
    setScale('normal');
  };

  // CSS classes or styles helper
  const getArabicClass = () => {
    switch (scale) {
      case 'xl':
        return 'text-4xl md:text-5xl leading-[2.6]';
      case 'large':
        return 'text-3xl md:text-4xl leading-[2.4]';
      case 'normal':
      default:
        return 'text-2xl md:text-3xl leading-[2.2]';
    }
  };

  const getBengaliClass = () => {
    switch (scale) {
      case 'xl':
        return 'text-xl md:text-2xl leading-relaxed';
      case 'large':
        return 'text-lg md:text-xl leading-relaxed';
      case 'normal':
      default:
        return 'text-base md:text-lg leading-relaxed';
    }
  };

  return {
    scale,
    increase,
    decrease,
    reset,
    getArabicClass,
    getBengaliClass,
    isInitialized,
  };
}
