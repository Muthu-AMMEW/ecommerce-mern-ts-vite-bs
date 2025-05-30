// src/utils/PWAButton.jsx

import usePWAInstallPrompt from './usePWAInstallPrompt';

function PWAButton() {
  const { isStandalone, canInstall, promptInstall } = usePWAInstallPrompt();

  const handleClick = async () => {
    if (isStandalone) {
      // User is inside the PWA
      const goToBrowser = window.confirm(
        'You are already using the installed app. Open in browser?'
      );
      if (goToBrowser) {
        window.open(window.location.origin, '_blank');
      }
    } else if (canInstall) {
      // Can show install prompt
      await promptInstall();
    } else {
      alert(
        'This app is already installed.'
      );
      // Installed, but user is in browser → redirect to origin
      // May trigger standalone app on Android/Chrome, fallback to browser otherwise
      // window.location.href = window.location.origin;
    }
  };

  const label = isStandalone
    ? 'Already Installed'
    : canInstall
      ? 'Install App'
      : 'Open App';

  return (
    <button onClick={handleClick}>
      {label}
    </button>
  );
}

export default PWAButton;
