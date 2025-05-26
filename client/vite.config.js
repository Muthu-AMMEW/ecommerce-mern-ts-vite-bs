import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';

// const env = loadEnv('development', process.cwd())

// https://vite.dev/config/
export default defineConfig({
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
  ],
  // define: {
  //   // Access your env variables directly
  //   __API_URL__: JSON.stringify(env.VITE_API_URL),
  // },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: env.VITE_API_URL, // your server
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
})
