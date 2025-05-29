// src/hooks/usePWAInstallPrompt.js
import { useEffect, useState } from 'react';

export default function usePWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Do not call e.preventDefault() — allow Chrome to auto-show the prompt
      console.log('[PWA] beforeinstallprompt fired');

      // Chrome may or may not show it — but we still store it
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setIsInstallable(false);

    return choice;
  };

  return {
    isInstallable,
    promptInstall,
  };
}
