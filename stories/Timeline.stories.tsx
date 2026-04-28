import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, type TimelineItem } from '../components/patterns/Timeline';

const operationHistory: TimelineItem[] = [
  { id: '1', title: 'Desembolso realizado',   status: 'completed', timestamp: '08/03/2025 14:32', description: 'Transferencia de $148.500.000 a cuenta Bancolombia del cedente.', badge: 'Completado' },
  { id: '2', title: 'Aprobación final',        status: 'completed', timestamp: '07/03/2025 10:15', description: 'María González (Dir. Financiero) aprobó la operación.' },
  { id: '3', title: 'Análisis de riesgo',      status: 'current',   timestamp: '06/03/2025 09:40', description: 'Score crediticio 780 · Riesgo Bajo. Analista: Ana Valdés.', badge: 'En curso', badgeVariant: 'secondary' },
  { id: '4', title: 'Radicación de facturas',  status: 'completed', timestamp: '05/03/2025 16:00', description: '12 facturas por $150.000.000. Deudor: Constructora Andina S.A.' },
  { id: '5', title: 'Solicitud ingresada',     status: 'completed', timestamp: '04/03/2025 11:20', description: 'Solicitud recibida y asignada a mesa de operaciones.' },
];

const pendingHistory: TimelineItem[] = [
  { id: '1', title: 'Radicación',  status: 'completed', timestamp: '01/03/2025', description: 'Documentos recibidos.' },
  { id: '2', title: 'Análisis',    status: 'completed', timestamp: '03/03/2025', description: 'Evaluación crediticia completada.' },
  { id: '3', title: 'Aprobación',  status: 'current',   description: 'Esperando firmas del comité.' },
  { id: '4', title: 'Desembolso',  status: 'pending',   description: 'Pendiente de aprobación.' },
  { id: '5', title: 'Cobro',       status: 'pending' },
];

const errorHistory: TimelineItem[] = [
  { id: '1', title: 'Solicitud ingresada', status: 'completed', timestamp: '10/02/2025' },
  { id: '2', title: 'Análisis inicial',    status: 'completed', timestamp: '11/02/2025' },
  { id: '3', title: 'Rechazo por riesgo',  status: 'error',     timestamp: '12/02/2025', description: 'Score crediticio insuficiente (210 / 1000). Mora activa registrada.', badge: 'Rechazado', badgeVariant: 'destructive' },
];

const meta: Meta<typeof Timeline> = {
  title: 'DSM/Patterns/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="max-w-lg p-6"><Story /></div>],
  args: { items: operationHistory },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {};

export const EnProceso: Story = {
  args: { items: pendingHistory },
};

export const Rechazado: Story = {
  args: { items: errorHistory },
};
