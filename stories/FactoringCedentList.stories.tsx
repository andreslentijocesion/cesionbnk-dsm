import type { Meta, StoryObj } from '@storybook/react';
import { FactoringCedentList } from '../components/patterns/factoring-cedent-list';

const meta: Meta<typeof FactoringCedentList> = {
  title: 'DSM/Patterns/FactoringCedentList',
  component: FactoringCedentList,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FactoringCedentList>;
export const Default: Story = {};
