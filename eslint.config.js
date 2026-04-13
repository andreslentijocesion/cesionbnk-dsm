import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  // ── Ignore list ────────────────────────────────────────────────────
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'plugin/**',
      'stories/**',          // stories usan style inline para demos
      'storybook-static/**', // build output de Storybook
      'scripts/**',          // Node.js scripts (CJS, no browser env)
      '*.config.js',
      '*.config.ts',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // ── Base rules (all files) ─────────────────────────────────────────
  {
    plugins: { react: reactPlugin, 'unused-imports': unusedImports },
    settings: { react: { version: 'detect' } },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  // ── Anti-hardcode: solo en components/ y pages/ (código de producción) ──
  {
    files: ['components/**/*.tsx', 'pages/**/*.tsx'],
    rules: {
      // Prohíbe style={{ }} inline → usar clases Tailwind
      'react/forbid-component-props': ['warn', {
        forbid: [{ propName: 'style', message: 'Usa clases Tailwind en lugar de style inline.' }],
      }],
      'react/forbid-dom-props': ['warn', {
        forbid: [{ propName: 'style', message: 'Usa clases Tailwind en lugar de style inline.' }],
      }],
      // Prohíbe colores hex y rgba directos
      'no-restricted-syntax': ['warn',
        {
          selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]',
          message: 'No uses colores hex directamente. Usa tokens del DSM (ej: text-primary, bg-muted).',
        },
        {
          selector: 'Literal[value=/^rgba?\\(/]',
          message: 'No uses rgba() directamente. Usa tokens del DSM.',
        },
      ],
    },
  },
);
