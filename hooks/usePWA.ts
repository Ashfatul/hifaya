'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

function subscribeInstalled(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('appinstalled', callback);
  const mediaQuery = window.matchMedia('(display-mode: standalone)');
  mediaQuery.addEventListener('change', callback);
  return () => {
    window.removeEventListener('appinstalled', callback);
    mediaQuery.removeEventListener('change', callback);
  };
}

function getIsInstalledSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function getIsInstalledServerSnapshot(): boolean {
  return false;
}

function getIsIOSSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isAppleMobile = /iphone|ipad|ipod/.test(userAgent);
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  return isAppleMobile && !isStandalone;
}

function getIsIOSServerSnapshot(): boolean {
  return false;
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);

  const isInstalled = useSyncExternalStore(
    subscribeInstalled,
    getIsInstalledSnapshot,
    getIsInstalledServerSnapshot
  );

  const isIOS = useSyncExternalStore(
    subscribeInstalled,
    getIsIOSSnapshot,
    getIsIOSServerSnapshot
  );

  useEffect(() => {
    // Service Worker Registration in production
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('Hifaya ServiceWorker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('ServiceWorker registration error:', err);
        });
    }

    // Capture beforeinstallprompt event (Android Chrome, Desktop Chrome, Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowInstallModal(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Trigger Install
  const promptInstall = useCallback(async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
      setShowInstallModal(false);
      return true;
    } else if (isIOS) {
      setShowInstallModal(true);
      return true;
    } else {
      setShowInstallModal(true);
      return false;
    }
  }, [deferredPrompt, isIOS]);

  return {
    isInstallable: isInstallable || isIOS,
    isInstalled,
    isIOS,
    showInstallModal,
    setShowInstallModal,
    promptInstall,
  };
}
