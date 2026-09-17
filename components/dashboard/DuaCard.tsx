'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DuaItem, ChildGender } from '@/types/dua';
import { FontScale } from '@/hooks/useFontSize';
import { TasbihCounter } from '../common/TasbihCounter';
import { AudioPlayer } from '../common/AudioPlayer';
import { Bookmark, Share2, Check, ExternalLink, BookOpen, Info } from 'lucide-react';

interface DuaCardProps {
  dua: DuaItem;
  gender: ChildGender;
  fontScale?: FontScale;
  isCompleted: boolean;
  onToggleComplete: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  arabicClass: string;
  bengaliClass: string;
}

export const DuaCard: React.FC<DuaCardProps> = ({
  dua,
  gender,
  isCompleted,
  onToggleComplete,
  isBookmarked,
  onToggleBookmark,
  arabicClass,
  bengaliClass,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  // Dynamic Arabic & Transliteration based on Gender
  const displayArabic = dua.hasGenderVariation && dua.genderVariations
    ? dua.genderVariations.arabic[gender]
    : dua.arabic;

  const displayTransliteration = dua.hasGenderVariation && dua.genderVariations
    ? dua.genderVariations.transliteration[gender]
    : dua.transliteration;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `${dua.title}
--------------------------
আরবি:
${displayArabic}

উচ্চারণ:
${displayTransliteration}

অর্থ:
${dua.meaning}

দলিল: ${dua.reference}
আমলের নিয়ম: ${dua.instructions}

(সংগৃহীত: Hifaya - হিফায়া অ্যাপ)`;

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <article
      className={`bg-white rounded-3xl p-5 sm:p-7 border transition-all duration-200 ${
        isCompleted
          ? 'border-emerald-300/80 shadow-xs bg-emerald-50/15'
          : 'border-[#D1E5D9] hover:border-[#2F6A4F]/60 shadow-2xs hover:shadow-sm'
      }`}
    >
      {/* Top Header: Category Tag, Bookmark & Copy */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/dua/${dua.id}`}
            className="text-base sm:text-lg font-bold text-[#1B362A] hover:text-[#2F6A4F] transition-colors flex items-center gap-1.5"
          >
            <span>{dua.title}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
          </Link>
          {dua.hasGenderVariation && (
            <span className="text-[11px] bg-[#EBF4EF] text-[#2F6A4F] px-2 py-0.5 rounded-full font-semibold border border-[#D1E5D9]/60">
              {gender === 'girl' ? '👧 কন্যা' : gender === 'boy' ? '👦 পুত্র' : '👶 যমজ'} অনুযায়ী সমন্বিত
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            title="দোয়া কপি করুন"
            className="p-2 rounded-xl text-[#526E60] hover:text-[#1B362A] hover:bg-[#FCFBF7] border border-transparent hover:border-[#D1E5D9] transition-all"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={onToggleBookmark}
            title={isBookmarked ? 'বুকমার্ক থেকে সরান' : 'পছন্দের তালিকায় যুক্ত করুন'}
            className={`p-2 rounded-xl border transition-all ${
              isBookmarked
                ? 'bg-amber-50 text-amber-600 border-amber-200'
                : 'text-[#526E60] hover:text-[#1B362A] hover:bg-[#FCFBF7] border-transparent hover:border-[#D1E5D9]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {dua.subtitle && (
        <p className="text-xs text-[#526E60] mb-4 -mt-2">{dua.subtitle}</p>
      )}

      {/* Main Arabic Box */}
      <div className="bg-[#FCFBF7] p-5 sm:p-6 rounded-2xl border border-[#E8D5BF]/40 mb-4 shadow-xs relative overflow-hidden">
        <div className="absolute top-2 right-2 opacity-5 pointer-events-none text-4xl">
          ☪
        </div>
        <p
          className={`font-arabic text-[#1B362A] text-right font-normal tracking-wide ${arabicClass}`}
          dir="rtl"
        >
          {displayArabic}
        </p>
      </div>

      {/* Bangla Pronunciation (Transliteration) */}
      <div className="mb-3.5 bg-[#EBF4EF]/40 p-3.5 rounded-xl border border-[#D1E5D9]/40">
        <div className="text-[11px] font-bold text-[#2F6A4F] uppercase tracking-wider mb-1 flex items-center gap-1">
          <span>উচ্চারণ:</span>
        </div>
        <p className={`text-[#1B362A] font-medium ${bengaliClass}`}>
          {displayTransliteration}
        </p>
      </div>

      {/* Bengali Meaning */}
      <div className="mb-4 pl-1">
        <div className="text-[11px] font-bold text-[#526E60] uppercase tracking-wider mb-1">
          অর্থ:
        </div>
        <p className={`text-[#374151] leading-relaxed ${bengaliClass}`}>
          &ldquo;{dua.meaning}&rdquo;
        </p>
      </div>

      {/* Hadith Reference & Instructions Accordion */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#D1E5D9]/50 text-xs text-[#526E60]">
        <div className="flex items-center gap-1.5 font-medium">
          <BookOpen className="w-3.5 h-3.5 text-[#2F6A4F]" />
          <span>{dua.reference}</span>
        </div>

        <button
          type="button"
          onClick={() => setShowInstructions(!showInstructions)}
          className="text-xs font-semibold text-[#2F6A4F] hover:underline flex items-center gap-1"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showInstructions ? 'আমলের নিয়ম লুকান' : 'আমলের নিয়ম দেখুন'}</span>
        </button>
      </div>

      {/* Instructions & Fazilat drawer */}
      {showInstructions && (
        <div className="mt-3 p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E8D5BF] text-xs space-y-2 animate-fadeIn">
          {dua.instructions && (
            <div>
              <strong className="text-[#1B362A] block mb-0.5">🌿 আমলের নিয়ম ও ফুঁ দেওয়ার পদ্ধতি:</strong>
              <p className="text-[#526E60] leading-relaxed">{dua.instructions}</p>
            </div>
          )}
          {dua.fazilat && (
            <div className="pt-2 border-t border-[#E8D5BF]/60">
              <strong className="text-[#1B362A] block mb-0.5">✨ হাদিসের ফজিলত:</strong>
              <p className="text-[#526E60] leading-relaxed">{dua.fazilat}</p>
            </div>
          )}
        </div>
      )}

      {/* Bottom Action Footer: Audio Player & Tasbih Counter */}
      <div className="mt-5 pt-4 border-t border-[#D1E5D9]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <AudioPlayer audioUrl={dua.audioUrl} title={dua.title} />

        <div className="sm:ml-auto">
          <TasbihCounter
            targetCount={dua.targetCount}
            isCompleted={isCompleted}
            onComplete={onToggleComplete}
          />
        </div>
      </div>
    </article>
  );
};
