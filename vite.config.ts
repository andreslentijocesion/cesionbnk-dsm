/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

function figmaAssetPlugin() {
  return {
    name: 'vite-plugin-figma-asset',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        return id;
      }
      return null;
    },
    load(id: string) {
      if (id.startsWith('figma:asset/')) {
        // Return a placeholder data URL for local development
        const placeholderSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100' viewBox='0 0 200 100'%3E%3Crect fill='%23e5e7eb' width='200' height='100'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3ELogo%3C/text%3E%3C/svg%3E`;
        return `export default "${placeholderSVG}";`;
      }
      return null;
    }
  };
}
export default defineConfig({
  plugins: [
  // The React and Tailwind plugins are both required for Make, even if
  // Tailwind is not being actively used – do not remove them
  react(), tailwindcss(), figmaAssetPlugin()],
  resolve: {
    alias: {
      // Alias @ to the project root (flat root structure — no src/)
      '@': path.resolve(__dirname, './')
    }
  },
  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.json'],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Priority 1: React Core (Must be loaded first)
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('scheduler/')) {
              return 'vendor-react';
            }
            // Priority 2: Heavy Visualization
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            // Priority 3: UI Primitives & Icons
            if (id.includes('@radix-ui') || id.includes('lucide-react') || id.includes('class-variance-authority')) {
              return 'vendor-ui';
            }
            // Priority 4: Animations
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            // Everything else
            return 'vendor-others';
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['components/ui/**/*.tsx', 'components/patterns/**/*.tsx'],
      exclude: ['**/*.stories.*', '**/*.test.*'],
    },
  }
});