import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker } from '../components/ui/date-range-picker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'DSM/Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: { placeholder: 'Seleccionar rango de fechas' },
};

export const Disabled: Story = {
  args: { placeholder: 'Sin disponibilidad', disabled: true },
};
