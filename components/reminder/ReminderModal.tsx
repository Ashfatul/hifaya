'use client';

import React, { useState } from 'react';
import { ReminderConfig } from '@/types/dua';
import { Bell, Info } from 'lucide-react';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ReminderConfig;
  permission: NotificationPermission;
  onRequestPermission: () => Promise<boolean>;
  onUpdateMorning: (enabled: boolean, time?: string) => void;
  onUpdateMaghrib: (enabled: boolean, time?: string) => void;
  onUpdateBedtime: (enabled: boolean, time?: string) => void;
  onSendTestNotification: (title: string, body: string) => boolean;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  isOpen,
  onClose,
  config,
  permission,
  onRequestPermission,
  onUpdateMorning,
  onUpdateMaghrib,
  onUpdateBedtime,
  onSendTestNotification,
}) => {
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleTestNotification = async () => {
    if (permission !== 'granted') {
      const granted = await onRequestPermission();
      if (!granted) return;
    }
    const success = onSendTestNotification(
      '🌙 হিফায়া — মাগরিব সতর্কতা',
      'সূর্যাস্তের সময় সমাগত। শিশুদের ঘরের ভেতরে রাখুন এবং সুরক্ষার দোয়া পড়ুন।'
    );
    if (success) {
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-xl border border-[#D1E5D9] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D1E5D9]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF4EF] text-[#2F6A4F] flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1B362A]">
                স্মার্ট রিমাইন্ডার ও নোটিফিকেশন
              </h3>
              <p className="text-xs text-[#526E60]">প্রতিদিনের হেফাজত ও সতর্কবার্তার সময়সূচি</p>
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

        {/* Permission Banner */}
        <div className="my-4 p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#D1E5D9] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔔</span>
            <div className="text-xs">
              <p className="font-semibold text-[#1B362A]">ব্রাউজার নোটিফিকেশন অনুমতি</p>
              <p className="text-[#526E60]">
                স্ট্যাটাস:{' '}
                {permission === 'granted' ? (
                  <span className="text-emerald-700 font-bold">অনুমোদিত (চালু আছে)</span>
                ) : permission === 'denied' ? (
                  <span className="text-rose-700 font-bold">বাতিলকৃত (ব্রাউজার সেটিংসে অনুমতি দিন)</span>
                ) : (
                  <span className="text-amber-700 font-bold">অনুমতি প্রয়োজন</span>
                )}
              </p>
            </div>
          </div>

          {permission !== 'granted' ? (
            <button
              type="button"
              onClick={onRequestPermission}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#2F6A4F] text-white hover:bg-[#1E4634] whitespace-nowrap shadow-2xs"
            >
              অনুমতি দিন
            </button>
          ) : (
            <button
              type="button"
              onClick={handleTestNotification}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#EBF4EF] text-[#2F6A4F] hover:bg-[#D1E5D9] whitespace-nowrap border border-[#D1E5D9]"
            >
              {testSent ? 'পাঠানো হয়েছে ✔' : 'টেস্ট নোটিফিকেশন'}
            </button>
          )}
        </div>

        {/* Reminder Settings List */}
        <div className="space-y-3.5">
          {/* Morning Reminder */}
          <div className="p-4 rounded-2xl border border-[#D1E5D9] bg-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌅</span>
              <div>
                <h4 className="text-xs font-bold text-[#1B362A]">সকালের হেফাজত রিমাইন্ডার</h4>
                <p className="text-[11px] text-[#526E60]">ফজর পরবর্তী ৩ কুল ও নববী সুরক্ষার দোয়া</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <input
                type="time"
                value={config.morningTime}
                onChange={(e) => onUpdateMorning(config.morningEnabled, e.target.value)}
                disabled={!config.morningEnabled}
                className="px-2 py-1 rounded-lg border border-[#D1E5D9] text-xs font-semibold text-[#1B362A] bg-[#FCFBF7] disabled:opacity-40"
              />
              <input
                type="checkbox"
                checked={config.morningEnabled}
                onChange={(e) => onUpdateMorning(e.target.checked)}
                className="w-4 h-4 accent-[#2F6A4F] rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Maghrib Sunset Caution Alert */}
          <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌇</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-[#1B362A]">মাগরিবের বিশেষ সতর্কতা</h4>
                  <span className="text-[9px] bg-amber-200/80 text-amber-900 font-bold px-1.5 py-0.2 rounded">
                    হাদিস নির্দেশিত
                  </span>
                </div>
                <p className="text-[11px] text-[#526E60]">শিশুদের ঘরে রাখা ও দরজা বন্ধের স্মরণ করিয়ে দেওয়া</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <input
                type="time"
                value={config.maghribTime}
                onChange={(e) => onUpdateMaghrib(config.maghribEnabled, e.target.value)}
                disabled={!config.maghribEnabled}
                className="px-2 py-1 rounded-lg border border-[#D1E5D9] text-xs font-semibold text-[#1B362A] bg-[#FCFBF7] disabled:opacity-40"
              />
              <input
                type="checkbox"
                checked={config.maghribEnabled}
                onChange={(e) => onUpdateMaghrib(e.target.checked)}
                className="w-4 h-4 accent-[#2F6A4F] rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Bedtime Routine Alert */}
          <div className="p-4 rounded-2xl border border-[#D1E5D9] bg-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛌</span>
              <div>
                <h4 className="text-xs font-bold text-[#1B362A]">রাতের ঘুমের আমল রিমাইন্ডার</h4>
                <p className="text-[11px] text-[#526E60]">আয়াতুল কুরসী ও ঘুমের মাসনূন আমল</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <input
                type="time"
                value={config.bedtimeTime}
                onChange={(e) => onUpdateBedtime(config.bedtimeEnabled, e.target.value)}
                disabled={!config.bedtimeEnabled}
                className="px-2 py-1 rounded-lg border border-[#D1E5D9] text-xs font-semibold text-[#1B362A] bg-[#FCFBF7] disabled:opacity-40"
              />
              <input
                type="checkbox"
                checked={config.bedtimeEnabled}
                onChange={(e) => onUpdateBedtime(e.target.checked)}
                className="w-4 h-4 accent-[#2F6A4F] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Hadith Note Box */}
        <div className="mt-4 p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#E8D5BF] text-xs text-[#526E60] space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#1B362A]">
            <Info className="w-3.5 h-3.5 text-[#2F6A4F]" />
            <span>মাগরিবের সতর্কতার গুরুত্ব:</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            রাসুলুল্লাহ (ﷺ) নির্দেশ দিয়েছেন সূর্যাস্তের সময় শিশুদের ঘরের বাইরে যেতে না দিতে, কেননা এ সময় শয়তানরা ছড়িয়ে পড়ে (বুখারী: ৩২৮০)। হিফায়া রিমাইন্ডার আপনাকে সঠিক সময়ে এই আমলটি মনে করিয়ে দেবে।
          </p>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2F6A4F] text-white text-xs font-semibold hover:bg-[#1E4634] shadow-xs"
          >
            সম্পন্ন
          </button>
        </div>
      </div>
    </div>
  );
};
