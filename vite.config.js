import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    // tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "./src/styles/global.css";`, // Ensure Tailwind has access
      },
    },
  },
});
