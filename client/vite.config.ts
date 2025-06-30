/* eslint-env node */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default ({ mode }: { mode: any }) => {
  // 1. Load environment variables from .env.[mode]
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    define: {
      // 2. Expose a custom global variable if needed
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV)
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Ecommerce App',
          short_name: 'Ecommerce',
          description: 'Ecommerce is best website for online purchases',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/images/logo.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/images/logo.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ]
  });
};
