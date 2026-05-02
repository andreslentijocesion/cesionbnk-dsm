import type { Meta, StoryObj } from '@storybook/react';
import { FactoringDebtorList } from '../components/patterns/factoring-debtor-list';

const meta: Meta<typeof FactoringDebtorList> = {
  title: 'DSM/Patterns/FactoringDebtorList',
  component: FactoringDebtorList,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FactoringDebtorList>;
export const Default: Story = {};
