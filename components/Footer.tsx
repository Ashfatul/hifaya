import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-[#D1E5D9]/70 bg-white py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-lg">🌙</span>
            <span className="font-bold text-[#1B362A] text-sm">Hifaya (হিফায়া)</span>
            <span className="text-[11px] bg-[#EBF4EF] text-[#2F6A4F] px-2 py-0.5 rounded-full font-semibold">
              সহীহ হাদিস ও কোরআনের আলোকে
            </span>
          </div>
          <p className="text-xs text-[#526E60]">
            শিশুর বরকতময় সুস্থতা, বদনজর থেকে হেফাজত ও পিতা-মাতার প্রতিদিনের আমল
          </p>
        </div>

        <div className="text-xs text-[#526E60] flex flex-col items-center sm:items-end gap-1">
          <div className="flex items-center gap-1 text-[11px] text-[#2F6A4F] font-arabic font-bold">
            اللَّهُمَّ بَارِكْ لَنَا فِي أَوْلَادِنَا وَاحْفَظْهُمْ
          </div>
          <p className="text-[11px]">
            &ldquo;হে আল্লাহ! আমাদের সন্তানদের বরকত দান করুন এবং তাদের হেফাজত করুন।&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
};
