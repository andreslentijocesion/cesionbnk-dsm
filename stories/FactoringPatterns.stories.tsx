import type { Meta, StoryObj } from '@storybook/react';
import { FactoringDashboard } from '../components/patterns/factoring-dashboard';
import { withGlobalProviders } from './decorators';

const meta: Meta<typeof FactoringDashboard> = {
  title: 'DSM/Patterns/FactoringDashboard',
  component: FactoringDashboard,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [withGlobalProviders],
};

export default meta;
type Story = StoryObj<typeof FactoringDashboard>;
export const Default: Story = {};
