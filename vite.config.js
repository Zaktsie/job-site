import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vite.dev/config/
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles:  ["./tests/setup.js"],
  }
})
