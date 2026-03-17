import type { Meta, StoryObj } from '@storybook/react';
import { FactoringNewOperation } from '../components/patterns/factoring-new-operation';

const meta: Meta<typeof FactoringNewOperation> = {
  title: 'DSM/Patterns/FactoringNewOperation',
  component: FactoringNewOperation,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FactoringNewOperation>;
export const Default: Story = {};
