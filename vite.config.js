import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['einkaufwagen.png'],
      manifest: {
        name: 'Einkaufsliste',
        short_name: 'Einkaufsliste - EJ',
        description: 'Eine einfache Einkaufsliste App',
        start_url: '/shopping-list/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'einkaufwagen.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'einkaufwagen.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png}'],
        navigateFallback: '/shopping-list/index.html'
      }
    })
  ],
  base: "/shopping-list/"
})