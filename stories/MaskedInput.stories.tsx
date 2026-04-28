import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MaskedInput } from '../components/ui/masked-input';

const meta: Meta<typeof MaskedInput> = {
  title: 'DSM/Primitives/MaskedInput',
  component: MaskedInput,
  tags: ['autodocs'],
  argTypes: {
    mask:           { control: 'select', options: ['nit', 'phone', 'bank-account', 'custom'] },
    showValidation: { control: 'boolean' },
    disabled:       { control: 'boolean' },
    pattern:        { control: 'text' },
  },
  args: { mask: 'nit', value: '', showValidation: true, disabled: false },
  decorators: [
    (Story, ctx) => {
      const [val, setVal] = useState(ctx.args.value ?? '');
      return <div className="max-w-xs"><Story args={{ ...ctx.args, value: val, onChange: setVal }} /></div>;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof MaskedInput>;

export const NIT: Story = { args: { mask: 'nit', value: '9001234567' } };

export const Telefono: Story = { args: { mask: 'phone', value: '573101234567' } };

export const CuentaBancaria: Story = { args: { mask: 'bank-account', value: '1234567890' } };

export const Personalizado: Story = {
  args: { mask: 'custom', pattern: '##/##/####', placeholder: 'DD/MM/AAAA' },
};

export const Deshabilitado: Story = {
  args: { mask: 'nit', value: '900.123.456-7', disabled: true },
};
