import type { Meta, StoryObj } from '@storybook/react';
import { RiskIndicator, type RiskFactor } from '../components/patterns/riskindicator';

const goodFactors: RiskFactor[] = [
  { label: 'Historial de pago',   value: 'Excelente', impact: 'positive' },
  { label: 'Antigüedad empresa',  value: '12 años',   impact: 'positive' },
  { label: 'Deuda/Patrimonio',    value: '0.4×',      impact: 'positive' },
  { label: 'Sector',             value: 'Construcción', impact: 'neutral' },
  { label: 'Concentración deuda', value: '35%',       impact: 'negative' },
];

const meta: Meta<typeof RiskIndicator> = {
  title: 'DSM/Patterns/RiskIndicator',
  component: RiskIndicator,
  tags: ['autodocs'],
  args: {
    score: 820,
    level: 'bajo',
    trend: 'up',
    source: 'DICOM · Equifax',
    updatedAt: '07/03/2025',
    factors: goodFactors,
    variant: 'default',
  },
  argTypes: {
    level:   { control: 'radio',  options: ['bajo', 'medio', 'alto', 'crítico'] },
    trend:   { control: 'radio',  options: ['up', 'down', 'neutral'] },
    variant: { control: 'radio',  options: ['default', 'compact'] },
    score:   { control: 'number', min: 0, max: 1000 },
  },
  decorators: [(Story) => <div className="max-w-xs"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof RiskIndicator>;

export const Default: Story = {};

export const Medio: Story = {
  args: {
    score: 540,
    level: 'medio',
    trend: 'neutral',
    factors: [
      { label: 'Historial de pago',  value: 'Regular', impact: 'neutral'  },
      { label: 'Antigüedad empresa', value: '3 años',  impact: 'negative' },
      { label: 'Deuda/Patrimonio',   value: '1.2×',    impact: 'negative' },
    ],
  },
};

export const Alto: Story = {
  args: {
    score: 320,
    level: 'alto',
    trend: 'down',
    factors: [
      { label: 'Mora 90+ días',    value: '2 registros', impact: 'negative' },
      { label: 'Deuda/Patrimonio', value: '2.8×',        impact: 'negative' },
      { label: 'Antigüedad',       value: '1 año',       impact: 'negative' },
    ],
  },
};

export const Critico: Story = {
  args: {
    score: 140,
    level: 'crítico',
    trend: 'down',
    factors: [
      { label: 'Mora activa',      value: '5 registros', impact: 'negative' },
      { label: 'Concurso previo',  value: 'Sí',          impact: 'negative' },
    ],
  },
};

export const Compacto: Story = {
  render: () => (
    <div className="space-y-2 max-w-sm">
      <RiskIndicator score={820} level="bajo"    trend="up"      source="Construcciones Andina" variant="compact" />
      <RiskIndicator score={540} level="medio"   trend="neutral" source="Textiles del Valle"    variant="compact" />
      <RiskIndicator score={320} level="alto"    trend="down"    source="Muebles Roble S.A.S."  variant="compact" />
      <RiskIndicator score={140} level="crítico" trend="down"    source="Pharma Colombia Ltda." variant="compact" />
    </div>
  ),
};
