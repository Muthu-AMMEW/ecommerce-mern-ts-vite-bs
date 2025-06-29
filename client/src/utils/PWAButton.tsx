// src/utils/PWAButton.jsx
import usePWAInstallPrompt from './usePWAInstallPrompt';

function PWAButton() {
  const { isStandalone, canInstall, cannotInstall, promptInstall } = usePWAInstallPrompt();

  const handleClick = async () => {
    if (isStandalone) {
      const goToBrowser = window.confirm(
        'You are already using the installed app. Open in browser?'
      );
      if (goToBrowser) {
        window.open(window.location.origin, '_blank');
      }
    } else if (canInstall) {
      await promptInstall();
    } else if (cannotInstall) {
      alert(
        'This app could not install on your device.'
      );
    } else {
      alert('This app is already installed.');
    }
  };

  const label = isStandalone
    ? 'Already Installed'
    : canInstall
      ? 'Install App'
      : cannotInstall
        ? 'Cannot Install'
        : 'Open App';

  return (
    <button onClick={handleClick}>
      {label}
    </button>
  );
}

export default PWAButton;
