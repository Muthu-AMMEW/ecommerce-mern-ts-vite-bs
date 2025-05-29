// src/components/InstallButton.jsx
import usePWAInstallPrompt from '../hooks/usePWAInstallPrompt';

function InstallButton() {
  const { isInstallable, promptInstall } = usePWAInstallPrompt();

  const handleClick = async () => {
    const result = await promptInstall();
    if (result?.outcome === 'accepted') {
      console.log('PWA install accepted');
    } else {
      console.log('PWA install dismissed');
    }
  };

  return (
    <>
      {isInstallable && (
        <button onClick={handleClick}>
          Install App
        </button>
      )}
    </>
  );
}

export default InstallButton;
