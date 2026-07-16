import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    ssr: resolve(__dirname, 'sites/server.ts'),
    outDir: 'dist/server',
    emptyOutDir: false,
    rollupOptions: {
      output: { entryFileNames: 'index.js' },
    },
  },
  plugins: [
    {
      name: 'sites-hosting-metadata',
      closeBundle() {
        const metadataDirectory = resolve(__dirname, 'dist/.openai');
        mkdirSync(metadataDirectory, { recursive: true });
        copyFileSync(resolve(__dirname, '.openai/hosting.json'), resolve(metadataDirectory, 'hosting.json'));
      },
    },
  ],
});
