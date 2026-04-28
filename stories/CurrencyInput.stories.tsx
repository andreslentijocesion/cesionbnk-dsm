import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CurrencyInput } from '../components/ui/CurrencyInput';

const meta: Meta<typeof CurrencyInput> = {
  title: 'DSM/Primitives/CurrencyInput',
  component: CurrencyInput,
  tags: ['autodocs'],
  argTypes: {
    mode:     { control: 'radio',   options: ['cop', 'usd', 'percent'] },
    size:     { control: 'radio',   options: ['sm', 'default', 'lg', 'xl'] },
    disabled: { control: 'boolean' },
    decimals: { control: 'number'  },
  },
  args: { value: 185000000, mode: 'cop', size: 'default', disabled: false },
  decorators: [
    (Story, ctx) => {
      const [val, setVal] = useState(ctx.args.value ?? 0);
      return <div className="max-w-sm"><Story args={{ ...ctx.args, value: val, onChange: (v: number | null) => setVal(v ?? 0) }} /></div>;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof CurrencyInput>;

export const Default: Story = {};

export const USD: Story = { args: { mode: 'usd', value: 50000 } };

export const Porcentaje: Story = { args: { mode: 'percent', value: 1.8, decimals: 2 } };

export const Deshabilitado: Story = { args: { disabled: true } };
