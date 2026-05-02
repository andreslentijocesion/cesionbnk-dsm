import type { Meta, StoryObj } from '@storybook/react';
import { NotificationCenter } from '../components/patterns/notification-center';

const meta: Meta<typeof NotificationCenter> = {
  title: 'DSM/Patterns/NotificationCenter',
  component: NotificationCenter,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof NotificationCenter>;

export const Default: Story = {};
