import type { Meta, StoryObj } from '@storybook/react';
import { FactoringApprovalQueue } from '../components/patterns/FactoringApprovalQueue';

const meta: Meta<typeof FactoringApprovalQueue> = {
  title: 'DSM/Patterns/FactoringApprovalQueue',
  component: FactoringApprovalQueue,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FactoringApprovalQueue>;
export const Default: Story = {};
