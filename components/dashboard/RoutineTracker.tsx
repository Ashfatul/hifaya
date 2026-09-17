'use client';

import React from 'react';
import { RoutineSlot } from '@/types/dua';
import { toBengaliNumber } from '../common/TasbihCounter';
import { Sun, Sunset, Moon, CheckCircle2, Circle } from 'lucide-react';

interface RoutineSlotInfo {
  slot: RoutineSlot;
  title: string;
  timeRange: string;
  icon: React.ReactNode;
  accent: string;
  bgLight: string;
  total: number;
  completed: number;
  percentage: number;
  isFullyCompleted: boolean;
}

interface RoutineTrackerProps {
  morningStats: { total: number; completed: number; percentage: number; isFullyCompleted: boolean };
  eveningStats: { total: number; completed: number; percentage: number; isFullyCompleted: boolean };
  bedtimeStats: { total: number; completed: number; percentage: number; isFullyCompleted: boolean };
  overallProgress: { total: number; completed: number; percentage: number };
  activeSlotFilter: RoutineSlot | null;
  onSelectSlot: (slot: RoutineSlot | null) => void;
  babyName: string;
}

export const RoutineTracker: React.FC<RoutineTrackerProps> = ({
  morningStats,
  eveningStats,
  bedtimeStats,
  overallProgress,
  activeSlotFilter,
  onSelectSlot,
  babyName,
}) => {
  const slots: RoutineSlotInfo[] = [
    {
      slot: 'morning',
      title: 'সকালের হেফাজত',
      timeRange: 'ফজর থেকে সূর্যোদয়',
      icon: <Sun className="w-4 h-4 text-amber-600" />,
      accent: 'border-amber-200 hover:border-amber-300',
      bgLight: 'bg-amber-50/50',
      total: morningStats.total,
      completed: morningStats.completed,
      percentage: morningStats.percentage,
      isFullyCompleted: morningStats.isFullyCompleted,
    },
    {
      slot: 'evening',
      title: 'মাগরিবের সুরক্ষা',
      timeRange: 'সূর্যাস্ত ও মাগরিবের পর',
      icon: <Sunset className="w-4 h-4 text-orange-600" />,
      accent: 'border-orange-200 hover:border-orange-300',
      bgLight: 'bg-orange-50/50',
      total: eveningStats.total,
      completed: eveningStats.completed,
      percentage: eveningStats.percentage,
      isFullyCompleted: eveningStats.isFullyCompleted,
    },
    {
      slot: 'bedtime',
      title: 'ঘুমের আমল',
      timeRange: 'রাতে ঘুমানোর পূর্বে',
      icon: <Moon className="w-4 h-4 text-indigo-600" />,
      accent: 'border-indigo-200 hover:border-indigo-300',
      bgLight: 'bg-indigo-50/50',
      total: bedtimeStats.total,
      completed: bedtimeStats.completed,
      percentage: bedtimeStats.percentage,
      isFullyCompleted: bedtimeStats.isFullyCompleted,
    },
  ];

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#D1E5D9] shadow-xs">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌤️</span>
            <h2 className="text-base sm:text-lg font-bold text-[#1B362A]">
              আজকের দিনের হেফাজত রুটিন
            </h2>
            <span className="text-xs bg-[#EBF4EF] text-[#2F6A4F] px-2.5 py-0.5 rounded-full font-semibold">
              {babyName}-এর জন্য
            </span>
          </div>
          <p className="text-xs text-[#526E60] mt-0.5">
            প্রতিদিনের সুন্নত আমল সম্পন্ন করে শিশুকে আল্লাহর জিম্মায় রাখুন
          </p>
        </div>

        {/* Overall progress indicator */}
        <div className="flex items-center gap-2 bg-[#FCFBF7] px-3.5 py-1.5 rounded-2xl border border-[#D1E5D9]">
          <span className="text-xs font-semibold text-[#526E60]">আজকের মোট:</span>
          <span className="text-xs font-bold text-[#2F6A4F]">
            {toBengaliNumber(overallProgress.completed)}/{toBengaliNumber(overallProgress.total)} আমল
          </span>
          <div className="w-16 h-2 bg-[#EBF4EF] rounded-full overflow-hidden ml-1">
            <div
              className="h-full bg-[#2F6A4F] rounded-full transition-all duration-300"
              style={{ width: `${overallProgress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Routine Slots Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {slots.map((item) => {
          const isSelected = activeSlotFilter === item.slot;

          return (
            <button
              key={item.slot}
              type="button"
              onClick={() => onSelectSlot(isSelected ? null : item.slot)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-[#2F6A4F] ring-2 ring-[#2F6A4F]/20 bg-[#EBF4EF]/40 shadow-xs'
                  : `border-[#E8EFEA] hover:bg-[#FCFBF7] ${item.accent}`
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-xl ${item.bgLight}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1B362A]">{item.title}</h3>
                    <p className="text-[10px] text-[#526E60]">{item.timeRange}</p>
                  </div>
                </div>

                {item.isFullyCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-[#D1E5D9] shrink-0" />
                )}
              </div>

              {/* Progress Bar & Status */}
              <div className="mt-2.5">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-[#526E60]">
                    {item.isFullyCompleted ? (
                      <span className="text-emerald-700 font-bold">সম্পন্ন ✔</span>
                    ) : (
                      <span>
                        {toBengaliNumber(item.completed)}/{toBengaliNumber(item.total)} সম্পন্ন
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-[#1B362A]">
                    {toBengaliNumber(item.percentage)}%
                  </span>
                </div>

                <div className="h-1.5 w-full bg-[#EBF4EF] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      item.isFullyCompleted ? 'bg-emerald-600' : 'bg-[#2F6A4F]'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>

              {isSelected && (
                <div className="mt-2 pt-2 border-t border-[#D1E5D9]/60 flex items-center justify-between text-[10px] text-[#2F6A4F] font-semibold">
                  <span>ফিল্টার সক্রিয়</span>
                  <span>সব দেখতে ট্যাপ করুন ✕</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
