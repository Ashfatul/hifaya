'use client';

import React from 'react';
import { FontScale } from '@/hooks/useFontSize';

interface FontSizeToggleProps {
  scale: FontScale;
  onIncrease: () => void;
  onDecrease: () => void;
  onReset: () => void;
}

export const FontSizeToggle: React.FC<FontSizeToggleProps> = ({
  scale,
  onIncrease,
  onDecrease,
  onReset,
}) => {
  return (
    <div className="inline-flex items-center bg-[#EBF4EF] p-1 rounded-xl border border-[#D1E5D9] text-xs font-medium text-[#1B362A]">
      <button
        type="button"
        onClick={onDecrease}
        disabled={scale === 'normal'}
        title="ফন্ট ছোট করুন"
        aria-label="Decrease font size"
        className={`px-2.5 py-1 rounded-lg transition-all ${
          scale === 'normal'
            ? 'opacity-40 cursor-not-allowed text-[#526E60]'
            : 'hover:bg-white text-[#1B362A] shadow-xs active:scale-95'
        }`}
      >
        A-
      </button>

      <button
        type="button"
        onClick={onReset}
        title="স্বাভাবিক ফন্ট"
        className="px-2 py-1 text-[11px] text-[#526E60] hover:text-[#1B362A] font-semibold"
      >
        {scale === 'normal' ? 'স্বাভাবিক' : scale === 'large' ? 'বড়' : 'খুব বড়'}
      </button>

      <button
        type="button"
        onClick={onIncrease}
        disabled={scale === 'xl'}
        title="ফন্ট বড় করুন"
        aria-label="Increase font size"
        className={`px-2.5 py-1 rounded-lg transition-all ${
          scale === 'xl'
            ? 'opacity-40 cursor-not-allowed text-[#526E60]'
            : 'hover:bg-white text-[#1B362A] shadow-xs active:scale-95 font-bold'
        }`}
      >
        A+
      </button>
    </div>
  );
};
