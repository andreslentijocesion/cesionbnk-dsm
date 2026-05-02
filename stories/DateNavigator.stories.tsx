import type { Meta, StoryObj } from '@storybook/react';
import { DateNavigator } from '../components/ui/datenavigator';

const meta: Meta<typeof DateNavigator> = {
  title: 'DSM/Components/DateNavigator',
  component: DateNavigator,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof DateNavigator>;

export const Default: Story = {
  args: { showNavigation: true },
};

export const WithoutNavigation: Story = {
  args: { showNavigation: false },
};

export const MonthAndYear: Story = {
  args: {
    presets: ['month', 'quarter', 'year'],
    showNavigation: true,
  },
};
