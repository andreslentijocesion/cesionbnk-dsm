import type { Meta, StoryObj } from '@storybook/react';
import { FactoringCedentProfile } from '../components/patterns/factoring-cedent-profile';

const meta: Meta<typeof FactoringCedentProfile> = {
  title: 'DSM/Patterns/FactoringCedentProfile',
  component: FactoringCedentProfile,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FactoringCedentProfile>;
export const Default: Story = {};
