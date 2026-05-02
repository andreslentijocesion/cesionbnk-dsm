import type { Meta, StoryObj } from '@storybook/react';
import { OperationStatusPipeline, type PipelineStage } from '../components/patterns/operationstatuspipeline';

const activeStages: PipelineStage[] = [
  { id: 'radicado',     label: 'Radicado',     status: 'completed', date: '01/03/2025', actor: 'Ana Valdés' },
  { id: 'revision',     label: 'En revisión',  status: 'completed', date: '03/03/2025', actor: 'Carlos R.' },
  { id: 'aprobado',     label: 'Aprobado',     status: 'completed', date: '05/03/2025', actor: 'Comité' },
  { id: 'desembolsado', label: 'Desembolsado', status: 'active',    date: '07/03/2025' },
  { id: 'cobro',        label: 'En cobro',     status: 'pending' },
  { id: 'cobrado',      label: 'Cobrado',      status: 'pending' },
];

const rejectedStages: PipelineStage[] = [
  { id: 'radicado',  label: 'Radicado',    status: 'completed', date: '01/03/2025' },
  { id: 'revision',  label: 'En revisión', status: 'completed', date: '02/03/2025' },
  { id: 'aprobado',  label: 'Rechazado',   status: 'rejected',  date: '04/03/2025', actor: 'Comité' },
  { id: 'desembolso',label: 'Desembolso',  status: 'skipped' },
  { id: 'cobro',     label: 'En cobro',    status: 'skipped' },
  { id: 'cobrado',   label: 'Cobrado',     status: 'skipped' },
];

const verticalStages: PipelineStage[] = [
  { id: 'radicado',     label: 'Radicado',     description: 'Operación recibida y registrada.', status: 'completed', date: '01/03/2025', actor: 'Ana Valdés' },
  { id: 'revision',     label: 'En revisión',  description: 'Análisis documental y score.',     status: 'completed', date: '03/03/2025', actor: 'Carlos R.' },
  { id: 'aprobado',     label: 'Aprobado',     description: 'Comité aprobó la operación.',      status: 'completed', date: '05/03/2025' },
  { id: 'desembolsado', label: 'Desembolsado', description: 'Fondos transferidos al cedente.',  status: 'active',    date: '07/03/2025' },
  { id: 'cobro',        label: 'En cobro',     description: 'Gestión de cobranza al deudor.',   status: 'pending' },
  { id: 'cobrado',      label: 'Cobrado',      description: 'Fondos recuperados. Fin.',          status: 'pending' },
];

const meta: Meta<typeof OperationStatusPipeline> = {
  title: 'DSM/Patterns/OperationStatusPipeline',
  component: OperationStatusPipeline,
  tags: ['autodocs'],
  args: { stages: activeStages, orientation: 'horizontal' },
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof OperationStatusPipeline>;

export const Default: Story = {};

export const Rechazado: Story = {
  args: { stages: rejectedStages },
};

export const Vertical: Story = {
  args: { stages: verticalStages, orientation: 'vertical' },
  render: (args) => (
    <div className="max-w-sm">
      <OperationStatusPipeline {...args} />
    </div>
  ),
};

export const Cobrado: Story = {
  args: {
    stages: activeStages.map((s) => ({ ...s, status: 'completed' as const, date: s.date ?? '10/03/2025' })),
  },
};
