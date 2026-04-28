import type { Meta, StoryObj } from '@storybook/react';
import { FactoringCalculator } from '../components/patterns/FactoringCalculator';

const meta: Meta<typeof FactoringCalculator> = {
  title: 'DSM/Patterns/FactoringCalculator',
  component: FactoringCalculator,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FactoringCalculator>;
export const Default: Story = {};
