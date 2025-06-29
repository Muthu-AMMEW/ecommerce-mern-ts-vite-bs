// src/utils/usePWAInstallPrompt.js
import { useEffect, useState } from 'react';

export default function usePWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [hasTriedPrompt, setHasTriedPrompt] = useState(false); // track if we missed the prompt

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Required on some browsers
      setDeferredPrompt(e);
      setHasTriedPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    const checkStandalone = () => {
      const isIos = window.navigator.standalone === true;
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      setIsStandalone(isIos || isStandalone);
    };

    checkStandalone();

    const displayModeMatcher = window.matchMedia('(display-mode: standalone)');
    displayModeMatcher.addEventListener('change', checkStandalone);

    // Set timeout to detect when install prompt was not fired
    const timer = setTimeout(() => {
      if (!deferredPrompt) {
        setHasTriedPrompt(true);
      }
    }, 3000); // wait 3s for prompt

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      displayModeMatcher.removeEventListener('change', checkStandalone);
      clearTimeout(timer);
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
    cannotInstall: hasTriedPrompt && !deferredPrompt,
  };
}
