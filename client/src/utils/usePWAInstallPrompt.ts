import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export default function usePWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [hasTriedPrompt, setHasTriedPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setHasTriedPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    const checkStandalone = () => {
      const isIos = (navigator as any).standalone === true;
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      setIsStandalone(isIos || isStandalone);
    };

    checkStandalone();

    const displayModeMatcher = window.matchMedia('(display-mode: standalone)');
    displayModeMatcher.addEventListener('change', checkStandalone);

    const timer = setTimeout(() => {
      if (!deferredPrompt) {
        setHasTriedPrompt(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      displayModeMatcher.removeEventListener('change', checkStandalone);
      clearTimeout(timer);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
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
