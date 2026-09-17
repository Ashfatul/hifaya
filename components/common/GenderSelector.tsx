'use client';

import React from 'react';
import { ChildGender } from '@/types/dua';

interface GenderSelectorProps {
  currentGender: ChildGender;
  onChange: (gender: ChildGender) => void;
  compact?: boolean;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  currentGender,
  onChange,
  compact = false,
}) => {
  const options: { id: ChildGender; label: string; icon: string; example: string }[] = [
    { id: 'girl', label: 'কন্যাশিশু', icon: '👧', example: 'উ‘ঈযুকি (أُعِيذُكِ)' },
    { id: 'boy', label: 'পুত্রসন্তান', icon: '👦', example: 'উ‘ঈযুকা (أُعِيذُكَ)' },
    { id: 'multiple', label: 'একাধিক / যমজ', icon: '👶👶', example: 'উ‘ঈযুকুম্বা (أُعِيذُكُمَا)' },
  ];

  if (compact) {
    return (
      <div className="inline-flex bg-[#FCFBF7] p-1 rounded-xl border border-[#D1E5D9] shadow-2xs">
        {options.map((opt) => {
          const isActive = currentGender === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#2F6A4F] text-white shadow-xs font-semibold'
                  : 'text-[#526E60] hover:text-[#1B362A] hover:bg-white/60'
              }`}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="bg-white p-3 rounded-2xl border border-[#D1E5D9] shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-[#526E60] flex items-center gap-1.5">
          <span>লিঙ্গ নির্বাচন (সর্বনাম ব্যাকরণ পরিবর্তন)</span>
        </span>
        <span className="text-[11px] text-[#2F6A4F] bg-[#EBF4EF] px-2 py-0.5 rounded-full font-medium">
          স্বয়ংক্রিয় ব্যাকরণ সমন্বয়
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
          const isActive = currentGender === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                isActive
                  ? 'border-[#2F6A4F] bg-[#EBF4EF] text-[#1B362A] ring-1 ring-[#2F6A4F]'
                  : 'border-[#E8EFEA] hover:border-[#D1E5D9] bg-[#FCFBF7] text-[#526E60]'
              }`}
            >
              <span className="text-lg mb-1">{opt.icon}</span>
              <span className="text-xs font-semibold">{opt.label}</span>
              <span className="text-[10px] text-[#2F6A4F] mt-0.5 opacity-90 truncate max-w-full font-arabic">
                {opt.example}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
