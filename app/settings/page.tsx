'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBabyProfile } from '@/hooks/useBabyProfile';
import { useReminders } from '@/hooks/useReminders';
import { useFontSize } from '@/hooks/useFontSize';
import { useRoutineProgress } from '@/hooks/useRoutineProgress';
import { GenderSelector } from '@/components/common/GenderSelector';
import { FontSizeToggle } from '@/components/common/FontSizeToggle';
import { PWAInstallModal } from '@/components/common/PWAInstallModal';
import { usePWA } from '@/hooks/usePWA';
import { ArrowLeft, User, Bell, Trash2, Check, Download, Smartphone } from 'lucide-react';

export default function SettingsPage() {
  const { profile, updateGender, updateName } = useBabyProfile();
  const {
    config,
    notificationPermission,
    requestPermission,
    updateMorning,
    updateMaghrib,
    updateBedtime,
    sendTestNotification,
  } = useReminders();
  const { scale, increase, decrease, reset } = useFontSize();
  const { resetToday } = useRoutineProgress();
  const {
    isInstalled,
    isIOS,
    showInstallModal,
    setShowInstallModal,
    promptInstall,
  } = usePWA();

  const [inputName, setInputName] = useState(profile.name);
  const [savedToast, setSavedToast] = useState(false);
  const [resetDoneToast, setResetDoneToast] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    updateName(inputName);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleResetAllData = () => {
    if (typeof window !== 'undefined') {
      const confirmReset = window.confirm(
        'আপনি কি নিশ্চিত যে আপনি আজকের আমল ও পড়ার হিস্ট্রি রিসেট করতে চান?'
      );
      if (confirmReset) {
        resetToday();
        setResetDoneToast(true);
        setTimeout(() => setResetDoneToast(false), 2500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] flex flex-col selection:bg-[#EBF4EF]">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-[#FCFBF7]/90 backdrop-blur-md border-b border-[#D1E5D9]/70 py-3.5 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#526E60] hover:text-[#1B362A] px-3 py-1.5 rounded-xl bg-white border border-[#D1E5D9] shadow-2xs hover:shadow-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ড্যাশবোর্ডে ফিরুন</span>
          </Link>
          <span className="text-sm font-bold text-[#1B362A]">হিফায়া সেটিংস</span>
        </div>
      </header>

      {/* Main Settings Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        {/* Baby Profile Settings Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1E5D9] shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#D1E5D9]/70">
            <div className="w-8 h-8 rounded-xl bg-[#EBF4EF] text-[#2F6A4F] flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1B362A]">শিশুর প্রোফাইল ও সর্বনাম</h2>
              <p className="text-xs text-[#526E60]">লিঙ্গ অনুযায়ী হাদিসের দোয়ার ব্যাকরণ স্বয়ংক্রিয়ভাবে পরিবর্তিত হবে</p>
            </div>
          </div>

          <form onSubmit={handleSaveName} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#526E60] mb-1.5">
                শিশুর নাম
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="যেমন: মাশফিয়া"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#D1E5D9] bg-[#FCFBF7] text-[#1B362A] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6A4F]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#2F6A4F] text-white text-xs font-semibold hover:bg-[#1E4634] shadow-xs"
                >
                  আপডেট
                </button>
              </div>
              {savedToast && (
                <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> নাম সফলভাবে সংরক্ষিত হয়েছে!
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#526E60] mb-2">
                লিঙ্গ ও ব্যাকরণ নির্বাচন
              </label>
              <GenderSelector
                currentGender={profile.gender}
                onChange={updateGender}
                compact={false}
              />
            </div>
          </form>
        </section>

        {/* Reminders Settings Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1E5D9] shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#D1E5D9]/70">
            <div className="w-8 h-8 rounded-xl bg-[#EBF4EF] text-[#2F6A4F] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1B362A]">হেফাজত রিমাইন্ডার সময়সূচি</h2>
              <p className="text-xs text-[#526E60]">প্রতিদিনের সকাল, মাগরিব ও ঘুমের সতর্কতা</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#D1E5D9]">
              <div>
                <span className="text-xs font-bold text-[#1B362A] block">সকালের হেফাজত</span>
                <span className="text-[11px] text-[#526E60]">ফজর পরবর্তী আমল</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={config.morningTime}
                  onChange={(e) => updateMorning(config.morningEnabled, e.target.value)}
                  disabled={!config.morningEnabled}
                  className="px-2 py-1 rounded-lg border border-[#D1E5D9] text-xs font-semibold"
                />
                <input
                  type="checkbox"
                  checked={config.morningEnabled}
                  onChange={(e) => updateMorning(e.target.checked)}
                  className="w-4 h-4 accent-[#2F6A4F]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200">
              <div>
                <span className="text-xs font-bold text-[#1B362A] block">মাগরিবের বিশেষ সতর্কতা</span>
                <span className="text-[11px] text-[#526E60]">শিশুদের ভেতরে রাখা ও সূর্যাস্তের আমল</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={config.maghribTime}
                  onChange={(e) => updateMaghrib(config.maghribEnabled, e.target.value)}
                  disabled={!config.maghribEnabled}
                  className="px-2 py-1 rounded-lg border border-[#D1E5D9] text-xs font-semibold"
                />
                <input
                  type="checkbox"
                  checked={config.maghribEnabled}
                  onChange={(e) => updateMaghrib(e.target.checked)}
                  className="w-4 h-4 accent-[#2F6A4F]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#D1E5D9]">
              <div>
                <span className="text-xs font-bold text-[#1B362A] block">রাতের ঘুমের আমল</span>
                <span className="text-[11px] text-[#526E60]">বিছানায় শোয়ার সময়ের আমল</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={config.bedtimeTime}
                  onChange={(e) => updateBedtime(config.bedtimeEnabled, e.target.value)}
                  disabled={!config.bedtimeEnabled}
                  className="px-2 py-1 rounded-lg border border-[#D1E5D9] text-xs font-semibold"
                />
                <input
                  type="checkbox"
                  checked={config.bedtimeEnabled}
                  onChange={(e) => updateBedtime(e.target.checked)}
                  className="w-4 h-4 accent-[#2F6A4F]"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-[#526E60]">
              নোটিফিকেশন স্ট্যাটাস:{' '}
              <strong>
                {notificationPermission === 'granted'
                  ? 'অনুমোদিত'
                  : notificationPermission === 'denied'
                  ? 'বাতিলকৃত'
                  : 'অনুমতি প্রয়োজন'}
              </strong>
            </span>
            {notificationPermission !== 'granted' ? (
              <button
                type="button"
                onClick={requestPermission}
                className="text-xs text-[#2F6A4F] font-bold underline"
              >
                অনুমতি চান
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  sendTestNotification('হিফায়া রিমাইন্ডার', 'টেস্ট নোটিফিকেশন সফল হয়েছে!')
                }
                className="text-xs text-[#2F6A4F] font-semibold underline"
              >
                টেস্ট নোটিফিকেশন পাঠান
              </button>
            )}
          </div>
        </section>

        {/* Font Scaler Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1E5D9] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1B362A]">পড়ার ফন্ট সাইজ</h2>
              <p className="text-xs text-[#526E60]">হরকত ও উচ্চারণ পড়ার সুবিধার্থে ফন্ট বড় বা ছোট করুন</p>
            </div>
            <FontSizeToggle
              scale={scale}
              onIncrease={increase}
              onDecrease={decrease}
              onReset={reset}
            />
          </div>
        </section>

        {/* PWA App Install Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1E5D9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF4EF] text-[#2F6A4F] flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1B362A]">ডিভাইসে অ্যাপ ইনস্টল (PWA)</h2>
              <p className="text-xs text-[#526E60]">
                ইন্টারনেট ছাড়া অফলাইনে দ্রুত ব্যবহারের জন্য আপনার ফোন বা পিসিতে অ্যাপ হিসেবে ইনস্টল করুন
              </p>
            </div>
          </div>

          {isInstalled ? (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold whitespace-nowrap">
              <Check className="w-4 h-4" />
              <span>ইনস্টল করা আছে</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowInstallModal(true)}
              className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2F6A4F] text-white text-xs font-bold hover:bg-[#1E4634] shadow-xs transition-all whitespace-nowrap active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>অ্যাপ ইনস্টল করুন</span>
            </button>
          )}
        </section>

        {/* Data Reset Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xs flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-rose-900">আজকের পড়ার হিস্ট্রি রিসেট</h2>
            <p className="text-xs text-[#526E60]">আজকের সম্পন্ন করা আমলের চেকলিস্ট মুছে নতুন করে শুরু করুন</p>
          </div>
          <button
            type="button"
            onClick={handleResetAllData}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-all whitespace-nowrap"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>রিসেট করুন</span>
          </button>
        </section>

        {resetDoneToast && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs text-center border border-emerald-200">
            আজকের আমলের চেকলিস্ট সফলভাবে রিসেট করা হয়েছে।
          </div>
        )}

        {/* PWA Install Modal */}
        <PWAInstallModal
          isOpen={showInstallModal}
          onClose={() => setShowInstallModal(false)}
          onInstall={promptInstall}
          isIOS={isIOS}
          isInstalled={isInstalled}
        />
      </main>
    </div>
  );
}
