'use client';

import React, { useState } from 'react';
import { Download, X } from 'lucide-react';

interface PWAInstallBannerProps {
  onOpenModal: () => void;
  isInstalled: boolean;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({
  onOpenModal,
  isInstalled,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed) return null;

  return (
    <aside aria-label="PWA install banner" className="bg-gradient-to-r from-[#EBF4EF] via-[#F4F9F6] to-[#EBF4EF] border-b border-[#D1E5D9] px-4 py-2.5 text-xs text-[#1B362A] transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-6 h-6 rounded-lg bg-[#2F6A4F] text-white flex items-center justify-center shrink-0 text-xs">
            📱
          </div>
          <p className="truncate">
            <span className="font-bold">হিফায়া অ্যাপ:</span>{' '}
            <span className="text-[#526E60] hidden sm:inline">
              ইন্টারনেট ছাড়া অফলাইনে দ্রুত ব্যবহারের জন্য ফোনে ইনস্টল করুন
            </span>
            <span className="text-[#526E60] sm:hidden">
              অফলাইনে পড়তে অ্যাপটি ইনস্টল করুন
            </span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onOpenModal}
            className="flex items-center gap-1 px-3 py-1 rounded-xl bg-[#2F6A4F] text-white font-semibold text-xs hover:bg-[#1E4634] shadow-2xs transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ইনস্টল</span>
          </button>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1 text-[#526E60] hover:text-[#1B362A] rounded-lg"
            title="লুকিয়ে রাখুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
