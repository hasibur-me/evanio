import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 5173,
    // Remove proxy in separated architecture - frontend calls backend directly via VITE_API_URL
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'helmet': ['react-helmet-async'],
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-i18next'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
});

