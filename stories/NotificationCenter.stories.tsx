import type { Meta, StoryObj } from '@storybook/react';
import { NotificationCenter } from '../components/patterns/NotificationCenter';

const meta: Meta<typeof NotificationCenter> = {
  title: 'DSM/Patterns/NotificationCenter',
  component: NotificationCenter,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof NotificationCenter>;

export const Default: Story = {};
