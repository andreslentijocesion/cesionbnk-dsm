import type { Preview, Decorator } from '@storybook/react-vite';
import { useEffect } from 'react';
import React from 'react';
import '../styles/globals.css';
import { ThemeProvider } from '../components/providers/themeprovider';
import { LoadingProvider } from '../components/providers/loadingprovider';
import { HelpProvider } from '../components/help/helpprovider';
import { TransitionProvider } from '../components/providers/transitionprovider';

// ── Dark mode toolbar toggle ──────────────────────────────────────────────────

export const globalTypes = {
  colorMode: {
    name: 'Color Mode',
    description: 'Light / Dark',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'sun',  title: 'Light' },
        { value: 'dark',  icon: 'moon', title: 'Dark'  },
      ],
      dynamicTitle: true,
    },
  },
};

// ── Theme decorator ───────────────────────────────────────────────────────────

const withTheme: Decorator = (Story, context) => {
  const colorMode = context.globals.colorMode ?? 'light';

  // Sync theme class to <html> so Tailwind dark: variants work
  useEffect(() => {
    document.documentElement.classList.toggle('dark', colorMode === 'dark');
    localStorage.setItem('theme', colorMode);
  }, [colorMode]);

  return (
    <ThemeProvider>
      <LoadingProvider>
        <HelpProvider>
          <TransitionProvider>
            <div className="p-6 bg-background min-h-screen text-foreground">
              <Story />
            </div>
          </TransitionProvider>
        </HelpProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
};

// ── Preview config ────────────────────────────────────────────────────────────

const preview: Preview = {
  decorators: [withTheme],

  parameters: {
    // Controls
    controls: {
      matchers: {
        color: /^(background|color|fill|stroke|tint)$/i,
        date:  /date$/i,
      },
      expanded: true, // Show prop descriptions by default
    },

    // a11y — real checks enabled (was 'todo' which disabled them)
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'label',          enabled: true },
        ],
      },
    },

    // Viewport presets (via addon-viewport)
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile (375)',
          styles: { width: '375px', height: '812px' },
          type: 'mobile',
        },
        mobileLg: {
          name: 'Mobile L (430)',
          styles: { width: '430px', height: '932px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet (768)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop (1280)',
          styles: { width: '1280px', height: '800px' },
          type: 'desktop',
        },
        wide: {
          name: 'Wide (1440)',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
      defaultViewport: 'desktop',
    },

    // Disable generic Storybook backgrounds — DSM uses its own theme bg
    backgrounds: { disable: true },

    // Story sort order
    options: {
      storySort: {
        order: [
          'DSM',
          [
            'Primitives',
            ['Actions', 'Forms', 'Navigation', 'Data Display', 'Feedback', 'Layout'],
            'Components',
            'Patterns',
            ['Factoring', '*'],
          ],
        ],
      },
    },
  },
};

export default preview;
