'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BabyProfile, ChildGender } from '@/types/dua';
import { FontScale } from '@/hooks/useFontSize';
import { FontSizeToggle } from '../common/FontSizeToggle';
import { Bell, BookOpen, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  profile: BabyProfile;
  onUpdateProfile: (name: string, gender: ChildGender) => void;
  fontScale: FontScale;
  onIncreaseFont: () => void;
  onDecreaseFont: () => void;
  onResetFont: () => void;
  onOpenReminders: () => void;
  onOpenGuidance: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onUpdateProfile,
  fontScale,
  onIncreaseFont,
  onDecreaseFont,
  onResetFont,
  onOpenReminders,
  onOpenGuidance,
}) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [tempGender, setTempGender] = useState<ChildGender>(profile.gender);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(tempName, tempGender);
    setShowProfileModal(false);
  };

  const getGenderEmoji = (gender: ChildGender) => {
    if (gender === 'boy') return '👦';
    if (gender === 'girl') return '👧';
    return '👶👶';
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#FCFBF7]/90 backdrop-blur-md border-b border-[#D1E5D9]/70 transition-all">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-[#2F6A4F] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <span className="text-xl">🌙</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl font-bold tracking-tight text-[#1B362A]">
                    Hifaya <span className="text-[#2F6A4F] text-base font-semibold">(হিফায়া)</span>
                  </h1>
                </div>
                <p className="text-xs text-[#526E60] font-medium hidden sm:block">
                  ইসলামিক শিশু হেফাজত, দোয়া ও রুটিন
                </p>
              </div>
            </Link>

            {/* Actions Bar */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Baby Profile Selector Pill */}
              <button
                type="button"
                onClick={() => {
                  setTempName(profile.name);
                  setTempGender(profile.gender);
                  setShowProfileModal(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#D1E5D9] hover:border-[#2F6A4F] text-[#1B362A] shadow-2xs hover:shadow-xs transition-all text-xs font-semibold"
                title="শিশুর নাম ও সর্বনাম পরিবর্তন করুন"
              >
                <span>{getGenderEmoji(profile.gender)}</span>
                <span className="max-w-[80px] sm:max-w-[120px] truncate">{profile.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#526E60]" />
              </button>

              {/* Font Scaler */}
              <FontSizeToggle
                scale={fontScale}
                onIncrease={onIncreaseFont}
                onDecrease={onDecreaseFont}
                onReset={onResetFont}
              />

              {/* Sunnah Guidance Button */}
              <button
                type="button"
                onClick={onOpenGuidance}
                className="p-2 rounded-xl bg-white border border-[#D1E5D9] text-[#2F6A4F] hover:bg-[#EBF4EF] transition-all shadow-2xs"
                title="মাগরিবের সতর্কতা ও ফুঁ দেওয়ার সুন্নতি নিয়ম"
                aria-label="Sunnah Guidance"
              >
                <BookOpen className="w-4 h-4" />
              </button>

              {/* Reminders Button */}
              <button
                type="button"
                onClick={onOpenReminders}
                className="p-2 rounded-xl bg-white border border-[#D1E5D9] text-[#2F6A4F] hover:bg-[#EBF4EF] transition-all shadow-2xs"
                title="রিমাইন্ডার ও সতর্কবার্তা সেটিংস"
                aria-label="Reminder Settings"
              >
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Baby Profile Edit Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-xl border border-[#D1E5D9]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#EBF4EF] text-[#2F6A4F] flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1B362A]">শিশুর প্রোফাইল</h3>
                  <p className="text-xs text-[#526E60]">দোয়ার বিশুদ্ধ ব্যাকরণ সর্বনাম সমন্বয়ের জন্য</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="text-[#526E60] hover:text-[#1B362A] p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#526E60] mb-1.5">
                  শিশুর নাম বা ডাকনাম
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="যেমন: মাশফিয়া, আবদুল্লাহ"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1E5D9] bg-[#FCFBF7] text-[#1B362A] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6A4F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#526E60] mb-2">
                  সন্তানের লিঙ্গ নির্বাচন
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTempGender('girl')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                      tempGender === 'girl'
                        ? 'border-[#2F6A4F] bg-[#EBF4EF] text-[#1B362A] ring-1 ring-[#2F6A4F]'
                        : 'border-[#D1E5D9] bg-[#FCFBF7] text-[#526E60]'
                    }`}
                  >
                    <span className="text-2xl mb-1">👧</span>
                    <span className="text-xs font-bold">কন্যাশিশু</span>
                    <span className="text-[10px] text-[#2F6A4F] font-arabic mt-1 font-semibold">أُعِيذُكِ</span>
                    <span className="text-[9px] text-[#526E60]">(উ‘ঈযুকি)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTempGender('boy')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                      tempGender === 'boy'
                        ? 'border-[#2F6A4F] bg-[#EBF4EF] text-[#1B362A] ring-1 ring-[#2F6A4F]'
                        : 'border-[#D1E5D9] bg-[#FCFBF7] text-[#526E60]'
                    }`}
                  >
                    <span className="text-2xl mb-1">👦</span>
                    <span className="text-xs font-bold">পুত্রসন্তান</span>
                    <span className="text-[10px] text-[#2F6A4F] font-arabic mt-1 font-semibold">أُعِيذُكَ</span>
                    <span className="text-[9px] text-[#526E60]">(উ‘ঈযুকা)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTempGender('multiple')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                      tempGender === 'multiple'
                        ? 'border-[#2F6A4F] bg-[#EBF4EF] text-[#1B362A] ring-1 ring-[#2F6A4F]'
                        : 'border-[#D1E5D9] bg-[#FCFBF7] text-[#526E60]'
                    }`}
                  >
                    <span className="text-2xl mb-1">👶👶</span>
                    <span className="text-xs font-bold">একাধিক/যমজ</span>
                    <span className="text-[10px] text-[#2F6A4F] font-arabic mt-1 font-semibold">أُعِيذُكُمَا</span>
                    <span className="text-[9px] text-[#526E60]">(উ‘ঈযুকুম্বা)</span>
                  </button>
                </div>
              </div>

              <div className="bg-[#FCFBF7] p-3 rounded-xl border border-[#E8D5BF]/50 text-xs text-[#526E60]">
                💡 <strong>হিফায়া সুবিধা:</strong> লিঙ্গ নির্বাচনের ফলে হাদিসের দোয়াগুলো স্বয়ংক্রিয়ভাবে বিশুদ্ধ সর্বনামসহ স্ক্রিনে প্রদর্শিত হবে।
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#526E60] hover:bg-[#FCFBF7]"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#2F6A4F] text-white hover:bg-[#1E4634] shadow-xs"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
