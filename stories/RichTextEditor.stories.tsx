import type { Meta, StoryObj } from '@storybook/react';
import { RichTextEditor } from '../components/advanced/richtexteditor';

const meta: Meta<typeof RichTextEditor> = {
  title: 'DSM/Advanced/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {
  args: {
    placeholder: 'Start typing...',
  },
};

export const ReadOnly: Story = {
  args: {
    value: '<p>This is <strong>read-only</strong> content that cannot be edited.</p>',
    readOnly: true,
  },
};

export const WithContent: Story = {
  args: {
    value: '<h1>Condiciones de la operación</h1><p>Se aprueba la operación de factoring por un monto de <strong>$1.200.000</strong> con las siguientes condiciones:</p><ul><li>Tasa: 1.5% mensual</li><li>Plazo: 60 días</li><li>Garantía: pagaré</li></ul>',
  },
};

export const FactoringNotes: Story = {
  name: 'Factoring — Notas de Análisis',
  args: {
    placeholder: 'Ingrese las observaciones del análisis crediticio...',
    value: '<p><strong>Análisis crediticio:</strong></p><p>El cedente presenta historial de pago positivo con 24 meses de antigüedad. El deudor es empresa de primera línea con calificación AA.</p>',
  },
};
