'use client';

import React from 'react';
import { SUNNAH_GUIDANCE } from '@/data/guidelines';
import { BookOpen, Check } from 'lucide-react';

interface SunnahGuidanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SunnahGuidanceModal: React.FC<SunnahGuidanceModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-7 shadow-xl border border-[#D1E5D9] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D1E5D9]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF4EF] text-[#2F6A4F] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1B362A]">
                সুন্নাহ গাইডলাইন ও আমলের আদব
              </h3>
              <p className="text-xs text-[#526E60]">হাদিসের আলোকে শিশুর সুরক্ষা ও ফুঁ দেওয়ার নিয়ম</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#526E60] hover:text-[#1B362A] rounded-lg text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Guidance Items */}
        <div className="space-y-6 my-5">
          {SUNNAH_GUIDANCE.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#FCFBF7] border border-[#D1E5D9] space-y-3"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#2F6A4F] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#1B362A]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#2F6A4F] font-semibold">{item.hadithReference}</p>
                </div>
              </div>

              <blockquote className="text-xs text-[#1B362A] italic bg-white p-3 rounded-xl border border-[#E8D5BF]/60 leading-relaxed">
                &ldquo;{item.description}&rdquo;
              </blockquote>

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-[#526E60] uppercase tracking-wider block">
                  করণীয় সুন্নত পয়েন্টসমূহ:
                </span>
                {item.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-[#374151]">
                    <Check className="w-3.5 h-3.5 text-[#2F6A4F] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-[#D1E5D9]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2F6A4F] text-white text-xs font-semibold hover:bg-[#1E4634] shadow-xs"
          >
            বুঝেছি, জাযাকাল্লাহু খাইরান
          </button>
        </div>
      </div>
    </div>
  );
};
