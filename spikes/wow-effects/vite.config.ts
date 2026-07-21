import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: './',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 4176,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});