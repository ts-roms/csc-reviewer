import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Service worker updates itself in the background, then activates on next load.
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png', 'favicon.png'],
      manifest: {
        name: 'CSC Exam Review — Philippines',
        short_name: 'CSC Review',
        description:
          'Study app for the Philippine Civil Service Exam — practice questions by section with answer keys and explanations. Works offline.',
        lang: 'en',
        theme_color: '#0b2545',
        background_color: '#f4f6fb',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        categories: ['education'],
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache the whole app shell so it loads with no network.
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      // Keep the SW off during `vite dev` so it never caches dev assets.
      devOptions: { enabled: false },
    }),
  ],
})
