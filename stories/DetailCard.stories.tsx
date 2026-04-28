import type { Meta, StoryObj } from '@storybook/react';
import { DetailCard, DetailSection, type DetailField } from '../components/patterns/DetailCard';
import { Badge } from '../components/ui/Badge';

// JSX values must be in render functions, not in args (not serializable)
const operacionFields: DetailField[] = [
  { label: 'Folio',       value: 'FCT-2025-0842',              copyable: true },
  { label: 'Estado',      value: 'Desembolsado' },
  { label: 'Cedente',     value: 'Construcciones Andina S.A.', span: 2 },
  { label: 'Monto',       value: '$185.000.000',               copyable: true },
  { label: 'Tasa',        value: '1,8% mensual' },
  { label: 'Plazo',       value: '60 días' },
  { label: 'Vencimiento', value: '11/05/2025' },
];

const operacionFieldsWithBadge: DetailField[] = [
  { label: 'Folio',       value: 'FCT-2025-0842',              copyable: true },
  { label: 'Estado',      value: <Badge variant="secondary">Desembolsado</Badge> },
  { label: 'Cedente',     value: 'Construcciones Andina S.A.', span: 2 },
  { label: 'Monto',       value: '$185.000.000',               copyable: true },
  { label: 'Tasa',        value: '1,8% mensual' },
  { label: 'Plazo',       value: '60 días' },
  { label: 'Vencimiento', value: '11/05/2025' },
];

const meta: Meta<typeof DetailCard> = {
  title: 'DSM/Patterns/DetailCard',
  component: DetailCard,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'radio', options: [2, 3, 4] },
    variant: { control: 'radio', options: ['default', 'compact'] },
    title:   { control: 'text' },
  },
  // No JSX in args — use render functions for stories with React element values
  decorators: [(Story) => <div className="max-w-2xl"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DetailCard>;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl">
      <DetailCard title="Datos de la Operación" columns={3} fields={operacionFields} />
    </div>
  ),
};

export const ConBadge: Story = {
  render: () => (
    <div className="max-w-2xl">
      <DetailCard title="Datos de la Operación" columns={3} fields={operacionFieldsWithBadge} />
    </div>
  ),
};

export const Compacto: Story = {
  render: () => (
    <div className="max-w-xl">
      <DetailCard title="Datos del Cedente" columns={2} variant="compact" fields={operacionFields} />
    </div>
  ),
};

export const Section: Story = {
  render: () => (
    <div className="max-w-xl border rounded-lg p-4">
      <p className="text-sm font-medium mb-3">Resumen</p>
      <DetailSection columns={3} fields={operacionFields} />
    </div>
  ),
};
