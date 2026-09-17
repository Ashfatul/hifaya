'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { DUAS } from '@/data/duas';
import { DuaCategory, RoutineSlot } from '@/types/dua';
import { useBabyProfile } from '@/hooks/useBabyProfile';
import { useFontSize } from '@/hooks/useFontSize';
import { useRoutineProgress } from '@/hooks/useRoutineProgress';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useReminders } from '@/hooks/useReminders';
import { usePWA } from '@/hooks/usePWA';

import { Header } from '@/components/dashboard/Header';
import { RoutineTracker } from '@/components/dashboard/RoutineTracker';
import { QuickFilter } from '@/components/dashboard/QuickFilter';
import { DuaCard } from '@/components/dashboard/DuaCard';
import { ReminderModal } from '@/components/reminder/ReminderModal';
import { SunnahGuidanceModal } from '@/components/SunnahGuidanceModal';
import { PWAInstallModal } from '@/components/common/PWAInstallModal';
import { PWAInstallBanner } from '@/components/common/PWAInstallBanner';
import { Footer } from '@/components/Footer';
import { toBengaliNumber } from '@/components/common/TasbihCounter';

import { 
  ShieldAlert, 
  Sparkles, 
  EyeOff, 
  HeartPulse, 
  Stethoscope, 
  Moon, 
  BookOpen, 
  CalendarCheck2
} from 'lucide-react';

export default function HomePage() {
  // Hooks
  const { profile, updateGender, updateName } = useBabyProfile();
  const { scale, increase, decrease, reset, getArabicClass, getBengaliClass } = useFontSize();
  const {
    isDuaCompleted,
    toggleDuaCompletion,
    morningStats,
    eveningStats,
    bedtimeStats,
    overallProgress,
  } = useRoutineProgress();
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  const {
    config: reminderConfig,
    notificationPermission,
    requestPermission,
    updateMorning,
    updateMaghrib,
    updateBedtime,
    sendTestNotification,
  } = useReminders();
  const {
    isInstalled,
    isIOS,
    showInstallModal,
    setShowInstallModal,
    promptInstall,
  } = usePWA();

  // State
  const [selectedCategory, setSelectedCategory] = useState<DuaCategory | 'all'>('all');
  const [activeSlotFilter, setActiveSlotFilter] = useState<RoutineSlot | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState<boolean>(false);

  // Modals
  const [isReminderOpen, setIsReminderOpen] = useState<boolean>(false);
  const [isGuidanceOpen, setIsGuidanceOpen] = useState<boolean>(false);

  // Filtering Duas
  const filteredDuas = useMemo(() => {
    return DUAS.filter((dua) => {
      // 1. Bookmarks filter
      if (showOnlyBookmarks && !bookmarks.includes(dua.id)) {
        return false;
      }

      // 2. Routine slot filter
      if (activeSlotFilter && !dua.routineSlots?.includes(activeSlotFilter)) {
        return false;
      }

      // 3. Category filter
      if (selectedCategory !== 'all' && dua.category !== selectedCategory) {
        return false;
      }

      // 4. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = dua.title.toLowerCase().includes(query);
        const matchesSubtitle = dua.subtitle?.toLowerCase().includes(query) ?? false;
        const matchesTranslit = dua.transliteration.toLowerCase().includes(query);
        const matchesMeaning = dua.meaning.toLowerCase().includes(query);
        const matchesRef = dua.reference.toLowerCase().includes(query);
        const matchesTags = dua.tags.some((t) => t.toLowerCase().includes(query));

        return matchesTitle || matchesSubtitle || matchesTranslit || matchesMeaning || matchesRef || matchesTags;
      }

      return true;
    });
  }, [showOnlyBookmarks, bookmarks, activeSlotFilter, selectedCategory, searchQuery]);

  // Quick Action Buttons
  const quickActions = [
    {
      title: 'বদনজর কাটানো',
      subtitle: 'রুকইয়াহ ও ফুঁ',
      category: 'evil-eye' as DuaCategory,
      icon: <EyeOff className="w-5 h-5 text-amber-700" />,
      bg: 'bg-amber-50 hover:bg-amber-100 border-amber-200',
    },
    {
      title: 'শিশু কাঁদলে বা ভয় পেলে',
      subtitle: 'অস্থিরতা দূর করার আমল',
      category: 'crying-fear' as DuaCategory,
      icon: <HeartPulse className="w-5 h-5 text-rose-700" />,
      bg: 'bg-rose-50 hover:bg-rose-100 border-rose-200',
    },
    {
      title: 'জ্বর ও ব্যথায় আমল',
      subtitle: 'ব্যথাস্থানে হাত রেখে দোয়া',
      category: 'fever-illness' as DuaCategory,
      icon: <Stethoscope className="w-5 h-5 text-teal-700" />,
      bg: 'bg-teal-50 hover:bg-teal-100 border-teal-200',
    },
    {
      title: 'ঘুমের দোয়া ও প্রশান্তি',
      subtitle: 'নিরাপদ রাতের ঘুম',
      category: 'bedtime' as DuaCategory,
      icon: <Moon className="w-5 h-5 text-indigo-700" />,
      bg: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
    },
  ];

  const handleQuickActionClick = (cat: DuaCategory) => {
    setSelectedCategory(cat);
    setActiveSlotFilter(null);
    setShowOnlyBookmarks(false);
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] flex flex-col selection:bg-[#EBF4EF]">
      {/* PWA Install Notification Banner */}
      <PWAInstallBanner
        onOpenModal={() => setShowInstallModal(true)}
        isInstalled={isInstalled}
      />

      {/* Header */}
      <Header
        profile={profile}
        onUpdateProfile={(name, gender) => {
          updateName(name);
          updateGender(gender);
        }}
        fontScale={scale}
        onIncreaseFont={increase}
        onDecreaseFont={decrease}
        onResetFont={reset}
        onOpenReminders={() => setIsReminderOpen(true)}
        onOpenGuidance={() => setIsGuidanceOpen(true)}
        onOpenInstall={() => setShowInstallModal(true)}
        isInstalled={isInstalled}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Welcome Greeting Banner */}
        <section className="bg-gradient-to-r from-[#2F6A4F] to-[#1E4634] rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center text-9xl font-arabic">
            الله
          </div>
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-emerald-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {profile.name}-এর বরকতময় দিন শুরু হোক
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              শিশুর প্রতিটি মুহূর্ত থাকুক আল্লাহর সুরক্ষায় ও জিম্মায়
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed pt-1">
              সহীহ হাদিস ও কোরআনের আলোকে শিশুর বদনজর, কান্নাকাটি, রোগব্যাধি দূর করার আমল ও দৈনন্দিন মাসনূন হেফাজত।
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/routine"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#2F6A4F] text-xs font-bold shadow-xs hover:bg-emerald-50 transition-colors"
              >
                <CalendarCheck2 className="w-4 h-4" />
                <span>দৈনিক চেকলিস্ট দেখুন</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsGuidanceOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/20 text-white text-xs font-semibold hover:bg-white/30 transition-colors border border-white/20"
              >
                <BookOpen className="w-4 h-4" />
                <span>সুন্নতি ফুঁ ও আমলের নিয়ম</span>
              </button>
            </div>
          </div>
        </section>

        {/* Daily Routine Tracker */}
        <RoutineTracker
          morningStats={morningStats}
          eveningStats={eveningStats}
          bedtimeStats={bedtimeStats}
          overallProgress={overallProgress}
          activeSlotFilter={activeSlotFilter}
          onSelectSlot={(slot) => {
            setActiveSlotFilter(slot);
            if (slot !== null) {
              setSelectedCategory('all');
            }
          }}
          babyName={profile.name}
        />

        {/* Emergency Quick Action Cards */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-[#1B362A] flex items-center gap-1.5">
              <span>⚡ প্রয়োজনভিত্তিক জরুরি দোয়া</span>
            </h3>
            <span className="text-[11px] text-[#526E60]">ক্লিক করে দ্রুত দোয়া দেখুন</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {quickActions.map((action) => (
              <button
                key={action.title}
                type="button"
                onClick={() => handleQuickActionClick(action.category)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all ${action.bg} shadow-2xs hover:shadow-xs active:scale-98`}
              >
                <div className="mb-2">{action.icon}</div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B362A]">
                  {action.title}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#526E60] mt-0.5">
                  {action.subtitle}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Maghrib Sunnah Alert Banner */}
        <section className="bg-gradient-to-r from-amber-50 to-[#FBF6EF] rounded-3xl p-4 sm:p-5 border border-amber-200/80 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-900 shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-[#1B362A]">
                  মাগরিবের বিশেষ সুন্নত সতর্কতা
                </h4>
                <span className="text-[10px] bg-amber-200 text-amber-900 font-semibold px-2 py-0.2 rounded-full">
                  হাদিস: বুখারী ৩২৮০
                </span>
              </div>
              <p className="text-xs text-[#526E60] mt-0.5 leading-relaxed">
                সূর্যাস্তের সময় শিশুদের ঘরের ভেতরে রাখা এবং বিসমিল্লাহ বলে দরজা বন্ধ করা সুন্নত। এ সময় শয়তানরা ছড়িয়ে পড়ে।
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsGuidanceOpen(true)}
            className="text-xs font-bold text-amber-900 hover:text-amber-950 underline whitespace-nowrap self-end sm:self-center"
          >
            বিস্তারিত পড়ুন →
          </button>
        </section>

        {/* Search & Categories Filter */}
        <QuickFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setActiveSlotFilter(null);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showOnlyBookmarks={showOnlyBookmarks}
          onToggleBookmarks={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
          totalBookmarksCount={bookmarks.length}
        />

        {/* Duas Feed Header */}
        <div className="flex items-center justify-between px-2 pt-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-[#1B362A]">
              {showOnlyBookmarks
                ? '⭐ বুকমার্ক করা প্রিয় দোয়াসমূহ'
                : activeSlotFilter
                ? `${
                    activeSlotFilter === 'morning'
                      ? '🌅 সকালের'
                      : activeSlotFilter === 'evening'
                      ? '🌇 মাগরিবের'
                      : '🛌 ঘুমের'
                  } রুটিন দোয়া`
                : selectedCategory === 'all'
                ? '📖 দোয়ার তালিকা'
                : '📖 নির্বাচিত বিষয়ের দোয়া'}
            </h3>
            <span className="text-xs bg-[#EBF4EF] text-[#2F6A4F] px-2 py-0.5 rounded-full font-semibold">
              {toBengaliNumber(filteredDuas.length)} টি দোয়া
            </span>
          </div>

          {(activeSlotFilter || selectedCategory !== 'all' || showOnlyBookmarks || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setActiveSlotFilter(null);
                setShowOnlyBookmarks(false);
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#2F6A4F] hover:underline"
            >
              সব ফিল্টার মুছুন ✕
            </button>
          )}
        </div>

        {/* Duas List */}
        {filteredDuas.length > 0 ? (
          <div className="grid grid-cols-1 gap-5">
            {filteredDuas.map((dua) => (
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
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#D1E5D9] shadow-xs space-y-3">
            <div className="text-4xl">🔍</div>
            <h4 className="text-base font-bold text-[#1B362A]">কোনো দোয়া পাওয়া যায়নি</h4>
            <p className="text-xs text-[#526E60] max-w-sm mx-auto">
              আপনার বর্তমান ফিল্টার বা সার্চ শব্দের সাথে কোনো দোয়া মিলছে না। অনুগ্রহ করে অন্য শব্দ দিয়ে চেষ্টা করুন।
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setActiveSlotFilter(null);
                setShowOnlyBookmarks(false);
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#2F6A4F] text-white text-xs font-semibold hover:bg-[#1E4634]"
            >
              সকল দোয়া দেখুন
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      <ReminderModal
        isOpen={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
        config={reminderConfig}
        permission={notificationPermission}
        onRequestPermission={requestPermission}
        onUpdateMorning={updateMorning}
        onUpdateMaghrib={updateMaghrib}
        onUpdateBedtime={updateBedtime}
        onSendTestNotification={sendTestNotification}
      />

      <SunnahGuidanceModal
        isOpen={isGuidanceOpen}
        onClose={() => setIsGuidanceOpen(false)}
      />

      {/* PWA Install Modal */}
      <PWAInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        onInstall={promptInstall}
        isIOS={isIOS}
        isInstalled={isInstalled}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
