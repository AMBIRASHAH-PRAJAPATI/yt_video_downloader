import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        emptyOutDir: true,
        outDir: 'dist/extension',
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'public/popup.html'),
                content: resolve(__dirname, 'src/extension/content.tsx'),
                background: resolve(__dirname, 'src/background.ts'),
            },
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            },
        },
    },
});