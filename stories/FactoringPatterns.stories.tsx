/**
 * FactoringPatterns.stories.tsx — Factoring Dashboard snapshot
 */
import type { Meta, StoryObj } from '@storybook/react';
import { FactoringDashboard } from '../components/patterns/FactoringDashboard';

const meta: Meta<typeof FactoringDashboard> = {
  title: 'DSM/Patterns/FactoringDashboard',
  component: FactoringDashboard,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FactoringDashboard>;
export const Default: Story = {};
