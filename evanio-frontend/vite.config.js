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
        manualChunks: (id) => {
          // Vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            if (id.includes('axios')) {
              return 'http-vendor';
            }
            if (id.includes('recharts')) {
              return 'charts-vendor';
            }
            if (id.includes('react-helmet') || id.includes('react-i18next') || id.includes('i18next')) {
              return 'utils-vendor';
            }
            // Other node_modules
            return 'vendor';
          }
        },
        // Optimize chunk names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Enable source maps only for debugging
    sourcemap: false,
    // Optimize asset inlining
    assetsInlineLimit: 4096, // 4kb
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-i18next', 'axios'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: false,
  },
});

