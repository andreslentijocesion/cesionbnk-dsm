import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NumberInput } from '../components/ui/number-input';

const meta: Meta<typeof NumberInput> = {
  title: 'DSM/Primitives/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {
    size:         { control: 'radio',   options: ['sm', 'default', 'lg'] },
    showControls: { control: 'boolean' },
    disabled:     { control: 'boolean' },
    min:          { control: 'number' },
    max:          { control: 'number' },
    step:         { control: 'number' },
    decimals:     { control: 'number' },
    suffix:       { control: 'text' },
    prefix:       { control: 'text' },
  },
  args: {
    value: 30,
    min: 0,
    max: 365,
    step: 1,
    suffix: 'días',
    size: 'default',
    showControls: true,
    disabled: false,
  },
  decorators: [
    (Story, ctx) => {
      const [val, setVal] = useState(ctx.args.value ?? 30);
      return <div className="max-w-xs"><Story args={{ ...ctx.args, value: val, onChange: setVal }} /></div>;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {};

export const Porcentaje: Story = {
  args: { value: 80, min: 0, max: 100, step: 5, suffix: '%', decimals: 0 },
};

export const Tasa: Story = {
  args: { value: 1.5, min: 0, max: 10, step: 0.1, decimals: 2, suffix: '%' },
};

export const SinControles: Story = {
  args: { showControls: false, suffix: 'cuotas' },
};

export const Tamaños: Story = {
  render: () => (
    <div className="space-y-3 max-w-xs">
      <NumberInput value={30} onChange={() => {}} suffix="días" size="sm" />
      <NumberInput value={30} onChange={() => {}} suffix="días" size="default" />
      <NumberInput value={30} onChange={() => {}} suffix="días" size="lg" />
    </div>
  ),
};

export const Deshabilitado: Story = {
  args: { disabled: true, value: 60 },
};
