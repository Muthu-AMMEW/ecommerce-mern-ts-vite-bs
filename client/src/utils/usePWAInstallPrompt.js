// src/utils/usePWAInstallPrompt.js
import { useEffect, useState } from 'react';

export default function usePWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    const checkStandalone = () => {
      const isIos = window.navigator.standalone === true;
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      setIsStandalone(isIos || isStandalone);
    };

    checkStandalone();
    window
      .matchMedia('(display-mode: standalone)')
      .addEventListener('change', checkStandalone);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    return result;
  };

  return {
    isStandalone,
    promptInstall,
    canInstall: !!deferredPrompt,
  };
}
