import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../components/ui/slider';
import { Label } from '../components/ui/label';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'DSM/Primitives/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  args: { min: 0, max: 100, step: 1, defaultValue: [50] },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = { render: (args) => <Slider {...args} className="w-64" /> };

export const WithValue: Story = {
  render: () => {
    const [val, setVal] = useState([2.5]);
    return (
      <div className="grid gap-2 w-72">
        <div className="flex justify-between">
          <Label>Tasa de descuento</Label>
          <span className="text-sm font-medium">{val[0].toFixed(1)}% MV</span>
        </div>
        <Slider min={0.5} max={5} step={0.1} value={val} onValueChange={setVal} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0.5%</span><span>5.0%</span>
        </div>
      </div>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [range, setRange] = useState([20, 80]);
    return (
      <div className="grid gap-2 w-72">
        <div className="flex justify-between">
          <Label>Rango de monto</Label>
          <span className="text-sm text-muted-foreground">${range[0]}M – ${range[1]}M</span>
        </div>
        <Slider min={0} max={100} step={5} value={range} onValueChange={setRange} />
      </div>
    );
  },
};
