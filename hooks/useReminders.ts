'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { ReminderConfig } from '@/types/dua';

const DEFAULT_REMINDERS: ReminderConfig = {
  morningEnabled: true,
  morningTime: '06:30',
  maghribEnabled: true,
  maghribTime: '17:45',
  bedtimeEnabled: true,
  bedtimeTime: '20:30',
};

function subscribePermission(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('notification-permission-change', callback);
  return () => {
    window.removeEventListener('notification-permission-change', callback);
  };
}

function getPermissionSnapshot(): NotificationPermission {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    return Notification.permission;
  }
  return 'default';
}

function getServerPermissionSnapshot(): NotificationPermission {
  return 'default';
}

export function useReminders() {
  const [config, setConfig, isInitialized] = useLocalStorage<ReminderConfig>(
    'hifaya_reminders',
    DEFAULT_REMINDERS
  );

  const notificationPermission = useSyncExternalStore(
    subscribePermission,
    getPermissionSnapshot,
    getServerPermissionSnapshot
  );

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      window.dispatchEvent(new Event('notification-permission-change'));
      return permission === 'granted';
    } catch {
      return false;
    }
  }, []);

  const updateMorning = useCallback(
    (enabled: boolean, time?: string) => {
      setConfig((prev) => ({
        ...prev,
        morningEnabled: enabled,
        morningTime: time !== undefined ? time : prev.morningTime,
      }));
    },
    [setConfig]
  );

  const updateMaghrib = useCallback(
    (enabled: boolean, time?: string) => {
      setConfig((prev) => ({
        ...prev,
        maghribEnabled: enabled,
        maghribTime: time !== undefined ? time : prev.maghribTime,
      }));
    },
    [setConfig]
  );

  const updateBedtime = useCallback(
    (enabled: boolean, time?: string) => {
      setConfig((prev) => ({
        ...prev,
        bedtimeEnabled: enabled,
        bedtimeTime: time !== undefined ? time : prev.bedtimeTime,
      }));
    },
    [setConfig]
  );

  const sendTestNotification = useCallback((title: string, body: string) => {
    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'granted'
    ) {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });
      return true;
    }
    return false;
  }, []);

  return {
    config,
    notificationPermission,
    requestPermission,
    updateMorning,
    updateMaghrib,
    updateBedtime,
    sendTestNotification,
    isInitialized,
  };
}
