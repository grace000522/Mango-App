
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This ensures process.env.API_KEY is replaced during build
    // and provides a fallback to prevent runtime errors.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env': JSON.stringify({ API_KEY: process.env.API_KEY || '' })
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});
