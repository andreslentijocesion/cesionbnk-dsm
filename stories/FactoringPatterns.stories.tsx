/**
 * FactoringPatterns.stories.tsx — Factoring Dashboard snapshot
 */
import type { Meta, StoryObj } from '@storybook/react';
import { FactoringDashboard } from '../components/patterns/factoring-dashboard';
import React from 'react';
import { ThemeProvider } from '../components/providers/themeprovider';
import { LoadingProvider } from '../components/providers/loadingprovider';
import { HelpProvider } from '../components/help/helpprovider';
import { TransitionProvider } from '../components/providers/transitionprovider';

const meta: Meta<typeof FactoringDashboard> = {
  title: 'DSM/Patterns/FactoringDashboard',
  component: FactoringDashboard,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <LoadingProvider>
          <HelpProvider>
            <TransitionProvider>
              <div className="p-8 bg-background min-h-screen">
                <Story />
              </div>
            </TransitionProvider>
          </HelpProvider>
        </LoadingProvider>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FactoringDashboard>;
export const Default: Story = {};
