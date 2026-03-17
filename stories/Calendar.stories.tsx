import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from '../components/ui/calendar';

const meta: Meta<typeof Calendar> = {
  title: 'DSM/Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};

export const WithSelected: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} />;
  },
};

export const Range: Story = {
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date } | undefined>();
    return <Calendar mode="range" selected={range as any} onSelect={setRange as any} numberOfMonths={2} />;
  },
};
