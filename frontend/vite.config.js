import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Замість списку доменів дозволяємо всі хости. 
    // Для навчального проекту на Render це найнадійніший варіант.
    allowedHosts: true 
  }
})