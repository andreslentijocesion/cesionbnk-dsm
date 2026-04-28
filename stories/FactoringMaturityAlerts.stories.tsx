import type { Meta, StoryObj } from '@storybook/react';
import { FactoringMaturityAlerts } from '../components/patterns/factoring-maturity-alerts';

const meta: Meta<typeof FactoringMaturityAlerts> = {
  title: 'DSM/Patterns/FactoringMaturityAlerts',
  component: FactoringMaturityAlerts,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FactoringMaturityAlerts>;
export const Default: Story = {};
