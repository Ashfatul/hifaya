'use client';

import { useLocalStorage } from './useLocalStorage';
import { DUAS } from '@/data/duas';
import { RoutineSlot } from '@/types/dua';

export interface DailyRoutineState {
  date: string; // YYYY-MM-DD
  completedIds: string[];
}

function getTodayKey() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function useRoutineProgress() {
  const todayKey = getTodayKey();
  const [storedData, setStoredData, isInitialized] = useLocalStorage<DailyRoutineState>(
    'hifaya_routine_progress',
    {
      date: todayKey,
      completedIds: [],
    }
  );

  // If date changed, reset for new day
  const effectiveData: DailyRoutineState =
    storedData.date === todayKey
      ? storedData
      : { date: todayKey, completedIds: [] };

  const isDuaCompleted = (duaId: string) => {
    return effectiveData.completedIds.includes(duaId);
  };

  const toggleDuaCompletion = (duaId: string) => {
    setStoredData((prev) => {
      const current = prev.date === todayKey ? prev.completedIds : [];
      const isDone = current.includes(duaId);
      const updated = isDone
        ? current.filter((id) => id !== duaId)
        : [...current, duaId];
      return {
        date: todayKey,
        completedIds: updated,
      };
    });
  };

  const markDuaComplete = (duaId: string) => {
    setStoredData((prev) => {
      const current = prev.date === todayKey ? prev.completedIds : [];
      if (current.includes(duaId)) return prev;
      return {
        date: todayKey,
        completedIds: [...current, duaId],
      };
    });
  };

  const resetToday = () => {
    setStoredData({
      date: todayKey,
      completedIds: [],
    });
  };

  // Routine slot statistics
  const getSlotStats = (slot: RoutineSlot) => {
    const slotDuas = DUAS.filter((d) => d.routineSlots?.includes(slot));
    const total = slotDuas.length;
    const completed = slotDuas.filter((d) =>
      effectiveData.completedIds.includes(d.id)
    ).length;
    return {
      total,
      completed,
      isFullyCompleted: total > 0 && completed >= total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  const morningStats = getSlotStats('morning');
  const eveningStats = getSlotStats('evening');
  const bedtimeStats = getSlotStats('bedtime');

  const totalRoutineDuas = DUAS.filter((d) => (d.routineSlots?.length ?? 0) > 0);
  const totalCompleted = totalRoutineDuas.filter((d) =>
    effectiveData.completedIds.includes(d.id)
  ).length;

  return {
    todayKey,
    completedIds: effectiveData.completedIds,
    isDuaCompleted,
    toggleDuaCompletion,
    markDuaComplete,
    resetToday,
    morningStats,
    eveningStats,
    bedtimeStats,
    overallProgress: {
      total: totalRoutineDuas.length,
      completed: totalCompleted,
      percentage:
        totalRoutineDuas.length > 0
          ? Math.round((totalCompleted / totalRoutineDuas.length) * 100)
          : 0,
    },
    isInitialized,
  };
}
