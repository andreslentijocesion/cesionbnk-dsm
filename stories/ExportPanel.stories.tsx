import type { Meta, StoryObj } from '@storybook/react';
import { ExportPanel, type ExportColumn } from '../components/patterns/export-panel';

const portfolioColumns: ExportColumn[] = [
  { id: 'operacion',   label: 'N° Operación',  defaultSelected: true },
  { id: 'cedente',     label: 'Cedente',        defaultSelected: true },
  { id: 'deudor',      label: 'Deudor',         defaultSelected: true },
  { id: 'monto',       label: 'Monto',          defaultSelected: true },
  { id: 'tasa',        label: 'Tasa MV',        defaultSelected: true },
  { id: 'vencimiento', label: 'Vencimiento',    defaultSelected: false },
  { id: 'estado',      label: 'Estado',         defaultSelected: false },
  { id: 'riesgo',      label: 'Nivel de riesgo', defaultSelected: false },
];

const meta: Meta<typeof ExportPanel> = {
  title: 'DSM/Patterns/ExportPanel',
  component: ExportPanel,
  tags: ['autodocs'],
  args: {
    title: 'Exportar Portafolio',
    columns: portfolioColumns,
    formats: ['csv', 'pdf'],
    showTrigger: true,
    triggerLabel: 'Exportar portafolio',
  },
};

export default meta;
type Story = StoryObj<typeof ExportPanel>;

export const Default: Story = {};

export const SoloCSV: Story = {
  args: {
    title: 'Exportar Cedentes',
    formats: ['csv'],
    columns: [
      { id: 'razon',   label: 'Razón Social', defaultSelected: true },
      { id: 'rut',     label: 'RUT',          defaultSelected: true },
      { id: 'giro',    label: 'Giro',         defaultSelected: false },
      { id: 'monto',   label: 'Cartera',      defaultSelected: true },
    ],
  },
};
