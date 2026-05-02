import type { Meta, StoryObj } from '@storybook/react';
import { CreditScoreCard, type CreditMetric } from '../components/patterns/creditscorecard';

const goodMetrics: CreditMetric[] = [
  { label: 'Facturas cedidas',  value: '127',    trend: 'up' },
  { label: 'Mora histórica',    value: '0.8%',   trend: 'down' },
  { label: 'Antigüedad',        value: '8 años', trend: 'neutral' },
  { label: 'Deudores activos',  value: '14',     trend: 'up' },
];

const riskMetrics: CreditMetric[] = [
  { label: 'Facturas cedidas', value: '34',   trend: 'down' },
  { label: 'Mora histórica',   value: '6.2%', trend: 'up' },
  { label: 'Antigüedad',       value: '1 año', trend: 'neutral' },
];

const meta: Meta<typeof CreditScoreCard> = {
  title: 'DSM/Patterns/CreditScoreCard',
  component: CreditScoreCard,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
  args: {
    name: 'Constructora Santa Fe SpA',
    nit: '900.543.210-9',
    industry: 'Construcción · Obras civiles',
    score: 780,
    limitAmount: '$150.000.000',
    usedAmount: '$45.000.000',
    riskLevel: 'bajo',
    updatedAt: '08/03/2025',
    metrics: goodMetrics,
  },
  argTypes: {
    riskLevel: { control: 'radio', options: ['bajo', 'medio', 'alto', 'critico'] },
    score: { control: 'number', min: 0, max: 1000 },
  },
};

export default meta;
type Story = StoryObj<typeof CreditScoreCard>;

export const Default: Story = {};

export const RiesgoMedio: Story = {
  args: {
    name: 'Textiles del Valle S.A.',
    nit: '830.234.567-3',
    industry: 'Manufactura textil',
    score: 540,
    limitAmount: '$80.000.000',
    usedAmount: '$60.000.000',
    riskLevel: 'medio',
    metrics: riskMetrics,
  },
};

export const RiesgoAlto: Story = {
  args: {
    name: 'Importadora Rápida Ltda.',
    nit: '860.111.222-5',
    industry: 'Comercio exterior',
    score: 320,
    limitAmount: '$30.000.000',
    usedAmount: '$28.500.000',
    riskLevel: 'alto',
    alert: 'Mora registrada en el sistema. Se requiere análisis adicional antes de aprobar nuevas operaciones.',
    metrics: [
      { label: 'Mora activa', value: '2 reg.', trend: 'up' },
      { label: 'Uso de cupo', value: '95%',   trend: 'up' },
    ],
  },
};

export const RiesgoCritico: Story = {
  args: {
    name: 'Servicios Globales S.A.S.',
    nit: '900.999.000-1',
    industry: 'Servicios generales',
    score: 130,
    limitAmount: '$20.000.000',
    usedAmount: '$20.000.000',
    riskLevel: 'critico',
    alert: 'Cliente en proceso de renegociación de deuda. Cupo bloqueado hasta resolución.',
  },
};
