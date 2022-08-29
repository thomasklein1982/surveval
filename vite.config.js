import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['favicon.svg','favicon.ico','robots.txt','apple-touch-icon.png'],
      manifest: {
        name: 'Survey Evaluation',
        short_name: 'SurvEval',
        description: '',
        theme_color: "black",
        icons: [
          {
            src: 'icon.png',
            sizes: '128x128',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: "./"
})
