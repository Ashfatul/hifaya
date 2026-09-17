'use client';

import React, { useState } from 'react';
import { playTasbihClick, playSuccessChime } from '@/lib/soundEffects';
import confetti from 'canvas-confetti';
import { Check, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface TasbihCounterProps {
  targetCount: number;
  initialCount?: number;
  onComplete?: () => void;
  isCompleted?: boolean;
}

export function toBengaliNumber(num: number): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .split('')
    .map((d) => bengaliDigits[parseInt(d, 10)] ?? d)
    .join('');
}

export const TasbihCounter: React.FC<TasbihCounterProps> = ({
  targetCount,
  initialCount = 0,
  onComplete,
  isCompleted = false,
}) => {
  const [count, setCount] = useState<number>(isCompleted ? targetCount : initialCount);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isDone, setIsDone] = useState<boolean>(isCompleted);

  const handleIncrement = () => {
    if (isDone) {
      // Allow re-tapping or reset
      return;
    }

    const nextCount = count + 1;
    setCount(nextCount);

    if (soundEnabled) {
      playTasbihClick();
    }

    if (nextCount >= targetCount) {
      setIsDone(true);
      if (soundEnabled) {
        playSuccessChime();
      }
      try {
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.8 },
          colors: ['#2F6A4F', '#D4A373', '#EBF4EF', '#526E60'],
        });
      } catch {
        // ignore
      }
      onComplete?.();
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount(0);
    setIsDone(false);
  };

  const percentage = Math.min(100, Math.round((count / targetCount) * 100));

  return (
    <div className="flex items-center gap-3 bg-[#FCFBF7] p-2 rounded-2xl border border-[#D1E5D9]/80">
      {/* Tap Counter Button */}
      <button
        type="button"
        onClick={handleIncrement}
        disabled={isDone}
        className={`relative flex items-center justify-center gap-2.5 px-4 py-2 rounded-xl font-medium transition-all select-none active:scale-95 ${
          isDone
            ? 'bg-emerald-100/80 text-emerald-900 border border-emerald-300 shadow-xs cursor-default'
            : 'bg-[#2F6A4F] hover:bg-[#1E4634] text-white shadow-sm hover:shadow active:bg-[#1B362A]'
        }`}
      >
        {isDone ? (
          <>
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold">
              সম্পন্ন ({toBengaliNumber(targetCount)}/{toBengaliNumber(targetCount)})
            </span>
          </>
        ) : (
          <>
            <span className="text-xs font-semibold">ট্যাপ করুন</span>
            <div className="flex items-baseline gap-0.5 bg-white/20 px-2 py-0.5 rounded-lg text-xs">
              <span className="font-bold">{toBengaliNumber(count)}</span>
              <span className="opacity-70">/{toBengaliNumber(targetCount)}</span>
            </div>
          </>
        )}
      </button>

      {/* Progress pill bar */}
      <div className="hidden sm:flex flex-col flex-1 max-w-[100px]">
        <div className="h-2 w-full bg-[#EBF4EF] rounded-full overflow-hidden border border-[#D1E5D9]/50">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isDone ? 'bg-emerald-600' : 'bg-[#D4A373]'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-[10px] text-[#526E60] font-medium text-right mt-0.5">
          {toBengaliNumber(percentage)}%
        </span>
      </div>

      {/* Controls: Mute & Reset */}
      <div className="flex items-center gap-1 ml-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSoundEnabled(!soundEnabled);
          }}
          title={soundEnabled ? 'সাউন্ড বন্ধ করুন' : 'সাউন্ড চালু করুন'}
          className="p-1.5 rounded-lg text-[#526E60] hover:text-[#1B362A] hover:bg-[#EBF4EF] transition-colors"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4 opacity-50" />
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          title="পুনরায় শুরু করুন (রিসেট)"
          className="p-1.5 rounded-lg text-[#526E60] hover:text-[#1B362A] hover:bg-[#EBF4EF] transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
