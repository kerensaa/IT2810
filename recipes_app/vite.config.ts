import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/project1',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    root: './src/tests'
  }
})
