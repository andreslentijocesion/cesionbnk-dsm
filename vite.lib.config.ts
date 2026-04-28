import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Library build config — used by `npm run build:lib`
 * Produces: dist/index.js + dist/index.d.ts
 * Does NOT include Tailwind (the consumer app handles that).
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // Do not bundle these — consumer app provides them
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        // Radix UI
        /^@radix-ui\/.*/,
        // Other peer deps
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'lucide-react',
        'cmdk',
        'sonner',
        'vaul',
        'input-otp',
        'react-day-picker',
        'date-fns',
        'react-hook-form',
        'zod',
        '@hookform/resolvers',
        'framer-motion',
        // Charts & data
        'recharts',
        /^recharts\/.*/,
        // Tables
        '@tanstack/react-table',
        /^@tanstack\/.*/,
        // Layout
        'react-resizable-panels',
        // Carousel
        'embla-carousel-react',
        /^embla-carousel.*/,
        // Misc
        'prop-types',
      ],
    },
    copyPublicDir: false,
    sourcemap: true,
  },
});
