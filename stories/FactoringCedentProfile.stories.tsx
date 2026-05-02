import type { Meta, StoryObj } from '@storybook/react';
import { FactoringCedentProfile } from '../components/patterns/factoring-cedent-profile';
import React from 'react';
import { ThemeProvider } from '../components/providers/themeprovider';
import { LoadingProvider } from '../components/providers/loadingprovider';
import { HelpProvider } from '../components/help/helpprovider';
import { TransitionProvider } from '../components/providers/transitionprovider';

const meta: Meta<typeof FactoringCedentProfile> = {
  title: 'DSM/Patterns/FactoringCedentProfile',
  component: FactoringCedentProfile,
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
type Story = StoryObj<typeof FactoringCedentProfile>;
export const Default: Story = {};
