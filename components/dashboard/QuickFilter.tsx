'use client';

import React from 'react';
import { DuaCategory } from '@/types/dua';
import { Search, Bookmark, X } from 'lucide-react';

interface QuickFilterProps {
  selectedCategory: DuaCategory | 'all';
  onSelectCategory: (cat: DuaCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showOnlyBookmarks: boolean;
  onToggleBookmarks: () => void;
  totalBookmarksCount: number;
}

export const QuickFilter: React.FC<QuickFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  showOnlyBookmarks,
  onToggleBookmarks,
  totalBookmarksCount,
}) => {
  const categories: { id: DuaCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'সকল দোয়া', icon: '✨' },
    { id: 'daily-protection', label: 'নিত্য হেফাজত', icon: '🛡️' },
    { id: 'evil-eye', label: 'বদনজর ও হিংসা', icon: '🧿' },
    { id: 'crying-fear', label: 'কান্না ও ভয়', icon: '😭' },
    { id: 'fever-illness', label: 'জ্বর ও ব্যথা', icon: '🤒' },
    { id: 'bedtime', label: 'ঘুমের আমল', icon: '🛌' },
    { id: 'parental-blessings', label: 'পিতা-মাতার দোয়া', icon: '🤲' },
  ];

  return (
    <div className="space-y-3">
      {/* Search Bar & Bookmarks Filter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#526E60] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="দোয়া, রোগ, বদনজর বা হাদিসের নাম দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-[#D1E5D9] text-sm text-[#1B362A] placeholder:text-[#526E60]/60 focus:outline-none focus:ring-2 focus:ring-[#2F6A4F] shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#526E60] hover:text-[#1B362A] p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Bookmarked Filter Pill */}
        <button
          type="button"
          onClick={onToggleBookmarks}
          className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border text-xs font-semibold transition-all whitespace-nowrap shadow-2xs ${
            showOnlyBookmarks
              ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
              : 'bg-white text-[#526E60] border-[#D1E5D9] hover:border-[#2F6A4F]'
          }`}
          title="বুকমার্ক করা প্রিয় দোয়াগুলো দেখুন"
        >
          <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarks ? 'fill-current' : ''}`} />
          <span className="hidden sm:inline">পছন্দের</span>
          {totalBookmarksCount > 0 && (
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                showOnlyBookmarks ? 'bg-amber-700 text-white' : 'bg-[#EBF4EF] text-[#2F6A4F]'
              }`}
            >
              {totalBookmarksCount}
            </span>
          )}
        </button>
      </div>

      {/* Categories Horizontal Pills Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        {categories.map((cat) => {
          const isActive = !showOnlyBookmarks && selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                if (showOnlyBookmarks) onToggleBookmarks();
                onSelectCategory(cat.id);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all select-none ${
                isActive
                  ? 'bg-[#2F6A4F] text-white shadow-xs scale-102'
                  : 'bg-white text-[#526E60] border border-[#D1E5D9] hover:border-[#2F6A4F] hover:text-[#1B362A]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
