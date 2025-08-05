import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true, // Clean before build
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),               // Extension popup
        content: resolve(__dirname, 'src/content.ts'),         // Extension content script
        background: resolve(__dirname, 'src/background.ts'),   // Extension background script
        web: resolve(__dirname, 'src/web/index.html'),         // Webapp entry
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === 'web') {
            return 'web-dist/[name].js';
          }
          return 'ext-dist/[name].js';
        },
        assetFileNames: '[name].[ext]',
        dir: 'dist',
      },
    },
  },
});
