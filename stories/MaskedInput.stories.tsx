import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MaskedInput } from '../components/ui/masked-input';

const meta: Meta<typeof MaskedInput> = {
  title: 'DSM/Primitives/MaskedInput',
  component: MaskedInput,
  tags: ['autodocs'],
  argTypes: {
    mask:           { control: 'select', options: ['rut', 'phone', 'bank-account', 'custom'] },
    showValidation: { control: 'boolean' },
    disabled:       { control: 'boolean' },
    pattern:        { control: 'text' },
  },
  args: { mask: 'rut', value: '', showValidation: true, disabled: false },
  decorators: [
    (Story, ctx) => {
      const [val, setVal] = useState(ctx.args.value ?? '');
      return <div className="max-w-xs"><Story args={{ ...ctx.args, value: val, onChange: setVal }} /></div>;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof MaskedInput>;

export const RUT: Story = { args: { mask: 'rut', value: '123456789' } };

export const Telefono: Story = { args: { mask: 'phone', value: '56912345678' } };

export const CuentaBancaria: Story = { args: { mask: 'bank-account', value: '1234567890123456' } };

export const Personalizado: Story = {
  args: { mask: 'custom', pattern: '##/##/####', placeholder: 'DD/MM/AAAA' },
};

export const Deshabilitado: Story = {
  args: { mask: 'rut', value: '12.345.678-9', disabled: true },
};
