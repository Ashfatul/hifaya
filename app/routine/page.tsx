'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DUAS } from '@/data/duas';
import { RoutineSlot } from '@/types/dua';
import { useBabyProfile } from '@/hooks/useBabyProfile';
import { useFontSize } from '@/hooks/useFontSize';
import { useRoutineProgress } from '@/hooks/useRoutineProgress';
import { useBookmarks } from '@/hooks/useBookmarks';
import { DuaCard } from '@/components/dashboard/DuaCard';
import { FontSizeToggle } from '@/components/common/FontSizeToggle';
import { ArrowLeft, Sun, Sunset, Moon, RotateCcw } from 'lucide-react';
import { toBengaliNumber } from '@/components/common/TasbihCounter';

export default function RoutinePage() {
  const { profile } = useBabyProfile();
  const { scale, increase, decrease, reset, getArabicClass, getBengaliClass } = useFontSize();
  const {
    isDuaCompleted,
    toggleDuaCompletion,
    resetToday,
    morningStats,
    eveningStats,
    bedtimeStats,
    overallProgress,
  } = useRoutineProgress();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const [activeSlot, setActiveSlot] = useState<RoutineSlot>('morning');

  const slotDuas = DUAS.filter((d) => d.routineSlots?.includes(activeSlot));

  return (
    <div className="min-h-screen bg-[#FCFBF7] flex flex-col selection:bg-[#EBF4EF]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#FCFBF7]/90 backdrop-blur-md border-b border-[#D1E5D9]/70 py-3.5 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#526E60] hover:text-[#1B362A] px-3 py-1.5 rounded-xl bg-white border border-[#D1E5D9] shadow-2xs hover:shadow-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ড্যাশবোর্ডে ফিরুন</span>
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
              onClick={resetToday}
              className="flex items-center gap-1 text-xs font-semibold text-[#526E60] hover:text-[#1B362A] px-3 py-1.5 rounded-xl bg-white border border-[#D1E5D9] shadow-2xs transition-all"
              title="আজকের প্রগ্রেস নতুন করে শুরু করুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">আজকের রিসেট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Header Hero */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1E5D9] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#2F6A4F] mb-1">
                <span>🗓️ প্রতিদিনের মাসনূন আমল</span>
                <span className="bg-[#EBF4EF] px-2 py-0.5 rounded-full">
                  {profile.name}-এর হেফাজত
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#1B362A]">
                দৈনিক রুটিন চেকলিস্ট
              </h1>
              <p className="text-xs sm:text-sm text-[#526E60] mt-1">
                প্রতিদিন সকাল, মাগরিব ও ঘুমানোর সময় নিয়মিত আমল করে শিশুকে নিরাপদে রাখুন
              </p>
            </div>

            {/* Overall Progress Badge */}
            <div className="bg-[#FCFBF7] p-4 rounded-2xl border border-[#D1E5D9] text-center min-w-[160px]">
              <span className="text-xs text-[#526E60] block mb-1 font-medium">আজকের মোট সম্পন্ন</span>
              <div className="text-xl font-bold text-[#2F6A4F]">
                {toBengaliNumber(overallProgress.completed)} / {toBengaliNumber(overallProgress.total)}
              </div>
              <div className="w-full h-2 bg-[#EBF4EF] rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-[#2F6A4F] rounded-full transition-all duration-300"
                  style={{ width: `${overallProgress.percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Slot Tabs */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 pt-5 border-t border-[#D1E5D9]">
            {/* Morning Tab */}
            <button
              type="button"
              onClick={() => setActiveSlot('morning')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-2xl border text-center transition-all ${
                activeSlot === 'morning'
                  ? 'border-[#2F6A4F] bg-[#EBF4EF] text-[#1B362A] shadow-xs font-bold ring-1 ring-[#2F6A4F]'
                  : 'border-[#E8EFEA] hover:bg-[#FCFBF7] text-[#526E60]'
              }`}
            >
              <Sun className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="text-left">
                <div className="text-xs sm:text-sm">সকালের আমল</div>
                <div className="text-[10px] opacity-80">
                  {toBengaliNumber(morningStats.completed)}/{toBengaliNumber(morningStats.total)} সম্পন্ন
                </div>
              </div>
            </button>

            {/* Evening Tab */}
            <button
              type="button"
              onClick={() => setActiveSlot('evening')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-2xl border text-center transition-all ${
                activeSlot === 'evening'
                  ? 'border-[#2F6A4F] bg-[#EBF4EF] text-[#1B362A] shadow-xs font-bold ring-1 ring-[#2F6A4F]'
                  : 'border-[#E8EFEA] hover:bg-[#FCFBF7] text-[#526E60]'
              }`}
            >
              <Sunset className="w-5 h-5 text-orange-600 shrink-0" />
              <div className="text-left">
                <div className="text-xs sm:text-sm">মাগরিবের আমল</div>
                <div className="text-[10px] opacity-80">
                  {toBengaliNumber(eveningStats.completed)}/{toBengaliNumber(eveningStats.total)} সম্পন্ন
                </div>
              </div>
            </button>

            {/* Bedtime Tab */}
            <button
              type="button"
              onClick={() => setActiveSlot('bedtime')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-2xl border text-center transition-all ${
                activeSlot === 'bedtime'
                  ? 'border-[#2F6A4F] bg-[#EBF4EF] text-[#1B362A] shadow-xs font-bold ring-1 ring-[#2F6A4F]'
                  : 'border-[#E8EFEA] hover:bg-[#FCFBF7] text-[#526E60]'
              }`}
            >
              <Moon className="w-5 h-5 text-indigo-600 shrink-0" />
              <div className="text-left">
                <div className="text-xs sm:text-sm">ঘুমের আমল</div>
                <div className="text-[10px] opacity-80">
                  {toBengaliNumber(bedtimeStats.completed)}/{toBengaliNumber(bedtimeStats.total)} সম্পন্ন
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Duas List for Active Slot */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-bold text-[#1B362A]">
              {activeSlot === 'morning'
                ? '🌅 সকালের জন্য নির্ধারিত আমলসমূহ'
                : activeSlot === 'evening'
                ? '🌇 মাগরিব ও সন্ধ্যার জন্য নির্ধারিত আমলসমূহ'
                : '🛌 রাতের নিরাপদ ঘুমের আমলসমূহ'}
            </h2>
            <span className="text-xs text-[#526E60]">
              মোট {toBengaliNumber(slotDuas.length)} টি দোয়া
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {slotDuas.map((dua) => (
              <DuaCard
                key={dua.id}
                dua={dua}
                gender={profile.gender}
                fontScale={scale}
                isCompleted={isDuaCompleted(dua.id)}
                onToggleComplete={() => toggleDuaCompletion(dua.id)}
                isBookmarked={isBookmarked(dua.id)}
                onToggleBookmark={() => toggleBookmark(dua.id)}
                arabicClass={getArabicClass()}
                bengaliClass={getBengaliClass()}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
