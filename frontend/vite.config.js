import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'laba-2-frontend.onrender.com' // Додаємо твій домен сюди
    ],
    host: true,
    port: 5173
  }
})