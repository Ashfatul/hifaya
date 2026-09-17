'use client';

import React from 'react';
import Image from 'next/image';
import { Download, Sparkles, WifiOff, Zap, Bell, Share2, PlusSquare, Check } from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => Promise<boolean>;
  isIOS: boolean;
  isInstalled: boolean;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  onInstall,
  isIOS,
  isInstalled,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#D1E5D9] relative overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#526E60] hover:text-[#1B362A] rounded-xl hover:bg-[#FCFBF7] transition-all font-bold text-base"
        >
          ✕
        </button>

        {/* Top App Branding */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="relative w-16 h-16 rounded-2xl shadow-md overflow-hidden bg-[#2F6A4F] flex items-center justify-center border-2 border-[#EBF4EF]">
            <Image
              src="/icons/icon-192.png"
              alt="Hifaya App Icon"
              width={64}
              height={64}
              className="object-cover"
              priority
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1 text-[11px] bg-[#EBF4EF] text-[#2F6A4F] px-2.5 py-0.5 rounded-full font-semibold mb-1">
              <Sparkles className="w-3 h-3" />
              <span>মোবাইল ও ডেস্কটপ অ্যাপ</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1B362A]">
              Hifaya (হিফায়া) ইনস্টল করুন
            </h3>
            <p className="text-xs text-[#526E60] mt-0.5">
              শিশুর সুরক্ষায় সবসময় চোখের সামনে রাখুন
            </p>
          </div>
        </div>

        {/* Benefits List */}
        <div className="my-5 p-4 rounded-2xl bg-[#FCFBF7] border border-[#D1E5D9] space-y-2.5">
          <div className="flex items-start gap-2.5 text-xs text-[#1B362A]">
            <div className="w-5 h-5 rounded-lg bg-[#EBF4EF] text-[#2F6A4F] flex items-center justify-center shrink-0 mt-0.5">
              <WifiOff className="w-3 h-3" />
            </div>
            <div>
              <span className="font-bold">১০০% অফলাইন সুবিধা:</span>
              <p className="text-[11px] text-[#526E60]">ইন্টারনেট বা ওয়াইফাই ছাড়াও সকল দোয়া, তসবীহ ও অডিও কাজ করবে।</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-[#1B362A]">
            <div className="w-5 h-5 rounded-lg bg-[#EBF4EF] text-[#2F6A4F] flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-3 h-3" />
            </div>
            <div>
              <span className="font-bold">এক ক্লিকে প্রবেশ:</span>
              <p className="text-[11px] text-[#526E60]">ব্রাউজারে না ঢুকে সরাসরি মোবাইলের হোম স্ক্রিন থেকে দ্রুত চালু করুন।</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-[#1B362A]">
            <div className="w-5 h-5 rounded-lg bg-[#EBF4EF] text-[#2F6A4F] flex items-center justify-center shrink-0 mt-0.5">
              <Bell className="w-3 h-3" />
            </div>
            <div>
              <span className="font-bold">সকাল ও মাগরিবের নোটিফিকেশন:</span>
              <p className="text-[11px] text-[#526E60]">সন্তানের নিরাপত্তার জন্য সঠিক সময়ে নির্ভরযোগ্য রিমাইন্ডার পাবেন।</p>
            </div>
          </div>
        </div>

        {/* Action / iOS Instructions */}
        {isInstalled ? (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>অ্যাপটি ইতিমধ্যে আপনার ডিভাইসে ইনস্টল করা আছে!</span>
          </div>
        ) : isIOS ? (
          <div className="p-4 bg-[#FBF6EF] border border-[#E8D5BF] rounded-2xl space-y-2 text-xs">
            <span className="font-bold text-[#936639] block">
              🍎 আইফোনে (iPhone / iPad) ইনস্টল করার নিয়ম:
            </span>
            <ol className="space-y-1.5 text-[11px] text-[#526E60] pl-1">
              <li className="flex items-center gap-1.5">
                <span>১. সাফারি ব্রাউজারের নিচে শেয়ার</span>
                <Share2 className="w-3.5 h-3.5 text-[#2F6A4F] inline" />
                <span>আইকনে ট্যাপ করুন।</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>২. স্ক্রল করে</span>
                <strong className="text-[#1B362A] flex items-center gap-1">
                  <PlusSquare className="w-3.5 h-3.5 inline text-[#2F6A4F]" /> Add to Home Screen
                </strong>
                <span>বাছুন।</span>
              </li>
              <li>৩. উপরে <strong>&quot;Add&quot;</strong> চাপলেই অ্যাপটি আপনার ফোনে ইনস্টল হয়ে যাবে।</li>
            </ol>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              type="button"
              onClick={onInstall}
              className="w-full py-3 px-4 rounded-2xl bg-[#2F6A4F] text-white text-sm font-bold hover:bg-[#1E4634] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>ডিভাইসে ইনস্টল করুন</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-xs font-semibold text-[#526E60] hover:text-[#1B362A] text-center"
            >
              এখন নয়, পরে করব
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
