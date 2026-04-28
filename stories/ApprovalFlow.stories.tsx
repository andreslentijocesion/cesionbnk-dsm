import type { Meta, StoryObj } from '@storybook/react';
import { ApprovalFlow, type Approver } from '../components/patterns/ApprovalFlow';

const inReviewApprovers: Approver[] = [
  { id: '1', name: 'Ana Valdés',      role: 'Analista de Riesgo',  status: 'approved', timestamp: '07/03 10:42', comment: 'Score 780. Historial impecable. Procede.' },
  { id: '2', name: 'Carlos Riquelme', role: 'Gerente Comercial',   status: 'pending',  isCurrent: true },
  { id: '3', name: 'María González',  role: 'Director Financiero', status: 'pending' },
];

const approvedApprovers: Approver[] = [
  { id: '1', name: 'Ana Valdés',      role: 'Analista de Riesgo',  status: 'approved', timestamp: '07/03 10:42' },
  { id: '2', name: 'Carlos Riquelme', role: 'Gerente Comercial',   status: 'approved', timestamp: '07/03 14:15' },
  { id: '3', name: 'María González',  role: 'Director Financiero', status: 'approved', timestamp: '08/03 09:00' },
];

const rejectedApprovers: Approver[] = [
  { id: '1', name: 'Ana Valdés',      role: 'Analista de Riesgo', status: 'approved', timestamp: '05/03 09:10' },
  { id: '2', name: 'Carlos Riquelme', role: 'Gerente Comercial',  status: 'rejected', timestamp: '05/03 11:30', comment: 'Documentación insuficiente. Solicitar estados financieros auditados.' },
  { id: '3', name: 'María González',  role: 'Director Financiero', status: 'skipped' },
];

const meta: Meta<typeof ApprovalFlow> = {
  title: 'DSM/Patterns/ApprovalFlow',
  component: ApprovalFlow,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="max-w-md p-6"><Story /></div>],
  args: {
    title: 'OP-2025-0312 · Comercial López Ltda.',
    status: 'in_review',
    approvers: inReviewApprovers,
  },
  argTypes: {
    status: { control: 'radio', options: ['pending', 'in_review', 'approved', 'rejected'] },
  },
};

export default meta;
type Story = StoryObj<typeof ApprovalFlow>;

export const Default: Story = {};

export const ConAcciones: Story = {
  args: {
    onApprove: () => alert('Aprobado'),
    onReject: () => alert('Rechazado'),
  },
};

export const Aprobado: Story = {
  args: {
    status: 'approved',
    approvers: approvedApprovers,
  },
};

export const Rechazado: Story = {
  args: {
    status: 'rejected',
    approvers: rejectedApprovers,
  },
};
