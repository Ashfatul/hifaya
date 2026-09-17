'use client';

import React from 'react';
import Link from 'next/link';
import { DuaItem } from '@/types/dua';
import { useBabyProfile } from '@/hooks/useBabyProfile';
import { useFontSize } from '@/hooks/useFontSize';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useRoutineProgress } from '@/hooks/useRoutineProgress';
import { FontSizeToggle } from '@/components/common/FontSizeToggle';
import { GenderSelector } from '@/components/common/GenderSelector';
import { TasbihCounter } from '@/components/common/TasbihCounter';
import { AudioPlayer } from '@/components/common/AudioPlayer';
import { ArrowLeft, Bookmark, Share2, BookOpen, Check, Shield } from 'lucide-react';

interface DuaDetailViewProps {
  dua: DuaItem;
}

export const DuaDetailView: React.FC<DuaDetailViewProps> = ({ dua }) => {
  const { profile, updateGender } = useBabyProfile();
  const { scale, increase, decrease, reset, getArabicClass, getBengaliClass } = useFontSize();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { isDuaCompleted, toggleDuaCompletion } = useRoutineProgress();

  const [copied, setCopied] = React.useState(false);

  const displayArabic =
    dua.hasGenderVariation && dua.genderVariations
      ? dua.genderVariations.arabic[profile.gender]
      : dua.arabic;

  const displayTransliteration =
    dua.hasGenderVariation && dua.genderVariations
      ? dua.genderVariations.transliteration[profile.gender]
      : dua.transliteration;

  const handleCopy = async () => {
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
      // ignore
    }
  };

  const isCompleted = isDuaCompleted(dua.id);

  return (
    <div className="min-h-screen bg-[#FCFBF7] flex flex-col selection:bg-[#EBF4EF]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#FCFBF7]/90 backdrop-blur-md border-b border-[#D1E5D9]/70 py-3.5 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#526E60] hover:text-[#1B362A] px-3 py-1.5 rounded-xl bg-white border border-[#D1E5D9] shadow-2xs hover:shadow-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরুন</span>
          </Link>

          <div className="flex items-center gap-2">
            <FontSizeToggle
              scale={scale}
              onIncrease={increase}
              onDecrease={decrease}
              onReset={reset}
            />

            <button
              type="button"
              onClick={handleCopy}
              className="p-2 rounded-xl bg-white border border-[#D1E5D9] text-[#526E60] hover:text-[#1B362A] shadow-2xs transition-all"
              title="দোয়া কপি করুন"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => toggleBookmark(dua.id)}
              className={`p-2 rounded-xl border shadow-2xs transition-all ${
                isBookmarked(dua.id)
                  ? 'bg-amber-50 text-amber-600 border-amber-200'
                  : 'bg-white text-[#526E60] border-[#D1E5D9] hover:text-[#1B362A]'
              }`}
              title="বুকমার্ক করুন"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked(dua.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Fullscreen Reading Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        {/* Title and Gender Switcher Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1E5D9] shadow-xs space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2F6A4F]">
              <Shield className="w-4 h-4" />
              <span>সহীহ হাদিস ও কোরআনী আমল</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1B362A]">
              {dua.title}
            </h1>
            {dua.subtitle && (
              <p className="text-xs sm:text-sm text-[#526E60]">{dua.subtitle}</p>
            )}
          </div>

          {/* Dynamic Gender Switcher if applicable */}
          {dua.hasGenderVariation && (
            <div className="pt-3 border-t border-[#D1E5D9]/60">
              <p className="text-xs text-[#526E60] mb-2 font-medium">
                শিশুর লিঙ্গ পরিবর্তন করুন (দোয়ার সর্বনাম সাথে সাথে পরিবর্তিত হবে):
              </p>
              <GenderSelector
                currentGender={profile.gender}
                onChange={updateGender}
                compact={false}
              />
            </div>
          )}
        </div>

        {/* Large Scalable Arabic Canvas */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D1E5D9] shadow-xs space-y-6 text-center">
          <div className="bg-[#FCFBF7] p-6 sm:p-10 rounded-2xl border border-[#E8D5BF]/50 shadow-inner relative">
            <span className="absolute top-3 left-4 text-xs font-bold text-[#D4A373] tracking-widest uppercase">
              হরকতসহ বিশুদ্ধ আরবি পাঠ
            </span>
            <p
              className={`font-arabic text-[#1B362A] pt-4 font-normal tracking-wide text-center leading-[2.6] ${getArabicClass()}`}
              dir="rtl"
            >
              {displayArabic}
            </p>
          </div>

          {/* Transliteration */}
          <div className="bg-[#EBF4EF]/50 p-5 rounded-2xl border border-[#D1E5D9]/60 text-left">
            <span className="text-xs font-bold text-[#2F6A4F] uppercase tracking-wider block mb-1.5">
              সহজ বাংলা উচ্চারণ (Transliteration):
            </span>
            <p className={`text-[#1B362A] font-medium leading-relaxed ${getBengaliClass()}`}>
              {displayTransliteration}
            </p>
          </div>

          {/* Translation */}
          <div className="bg-[#FCFBF7] p-5 rounded-2xl border border-[#D1E5D9]/50 text-left">
            <span className="text-xs font-bold text-[#526E60] uppercase tracking-wider block mb-1.5">
              বাংলা অর্থ:
            </span>
            <p className={`text-[#374151] leading-relaxed italic ${getBengaliClass()}`}>
              &ldquo;{dua.meaning}&rdquo;
            </p>
          </div>

          {/* Interactive Tasbih & Audio Section */}
          <div className="pt-4 border-t border-[#D1E5D9]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <AudioPlayer audioUrl={dua.audioUrl} title={dua.title} />

            <div className="w-full sm:w-auto">
              <TasbihCounter
                targetCount={dua.targetCount}
                isCompleted={isCompleted}
                onComplete={() => toggleDuaCompletion(dua.id)}
              />
            </div>
          </div>
        </div>

        {/* Hadith Reference, Rules and Fazilat */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1E5D9] shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#D1E5D9]/70">
            <BookOpen className="w-5 h-5 text-[#2F6A4F]" />
            <h2 className="text-base font-bold text-[#1B362A]">দলিল ও আমলের নিয়ম</h2>
          </div>

          <div className="space-y-4 text-sm text-[#374151]">
            <div>
              <strong className="text-xs font-bold text-[#526E60] uppercase tracking-wider block mb-1">
                সহীহ হাদিস বা কোরআনের দলিল:
              </strong>
              <p className="text-sm font-semibold text-[#1B362A] bg-[#FCFBF7] p-3 rounded-xl border border-[#D1E5D9]">
                {dua.reference}
              </p>
            </div>

            {dua.instructions && (
              <div>
                <strong className="text-xs font-bold text-[#526E60] uppercase tracking-wider block mb-1">
                  🌿 আমলের সঠিক সুন্নতি নিয়ম:
                </strong>
                <p className="text-sm text-[#374151] bg-[#FCFBF7] p-4 rounded-xl border border-[#D1E5D9] leading-relaxed">
                  {dua.instructions}
                </p>
              </div>
            )}

            {dua.fazilat && (
              <div>
                <strong className="text-xs font-bold text-[#526E60] uppercase tracking-wider block mb-1">
                  ✨ ফজিলত ও তাৎপর্য:
                </strong>
                <p className="text-sm text-[#374151] bg-[#FCFBF7] p-4 rounded-xl border border-[#D1E5D9] leading-relaxed">
                  {dua.fazilat}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
