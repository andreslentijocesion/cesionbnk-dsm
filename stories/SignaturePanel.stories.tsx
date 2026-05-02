import type { Meta, StoryObj } from '@storybook/react';
import { SignaturePanel, type Signatory } from '../components/patterns/signaturepanel';

const mixedSignatories: Signatory[] = [
  { id: '1', name: 'Carlos Riquelme', role: 'Gerente General',    email: 'c.riquelme@empresa.com', status: 'signed',  order: 1, signedAt: '07/03/2025 09:14' },
  { id: '2', name: 'Ana Valdés',      role: 'Representante Legal', email: 'a.valdes@empresa.com',   status: 'signed',  order: 2, signedAt: '07/03/2025 11:30' },
  { id: '3', name: 'Pedro Morales',   role: 'Director Financiero', email: 'p.morales@empresa.com',  status: 'pending', order: 3 },
];

const meta: Meta<typeof SignaturePanel> = {
  title: 'DSM/Patterns/SignaturePanel',
  component: SignaturePanel,
  tags: ['autodocs'],
  args: {
    title: 'Autorización de desembolso',
    documentName: 'FCT-2025-0842 — Construcciones Andina S.A. — $185.000.000',
    signatories: mixedSignatories,
    sequential: true,
    expiresAt: '14/03/2025',
  },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof SignaturePanel>;

export const Default: Story = {};

export const TodosFirmados: Story = {
  args: {
    signatories: mixedSignatories.map((s) => ({
      ...s,
      status: 'signed' as const,
      signedAt: s.signedAt ?? '07/03/2025 14:00',
    })),
    title: 'Contrato firmado',
  },
};

export const Rechazado: Story = {
  args: {
    signatories: [
      { id: '1', name: 'Carlos Riquelme', role: 'Gerente General',    email: 'c.riquelme@empresa.com', status: 'signed',   order: 1, signedAt: '05/03/2025' },
      { id: '2', name: 'Ana Valdés',      role: 'Representante Legal', email: 'a.valdes@empresa.com',   status: 'rejected', order: 2, rejectedReason: 'Monto fuera del límite aprobado.' },
      { id: '3', name: 'Pedro Morales',   role: 'Director Financiero', email: 'p.morales@empresa.com',  status: 'skipped',  order: 3 },
    ],
    title: 'Acuerdo de cesión',
    documentName: 'Cesión FCT-2025-0839',
  },
};

export const Paralelo: Story = {
  args: {
    sequential: false,
    title: 'Contrato de factoring marco',
    documentName: 'Contrato marco 2025',
    expiresAt: '20/03/2025',
    signatories: [
      { id: '1', name: 'María González', role: 'Socia fundadora', email: 'm.gonzalez@empresa.com', status: 'signed',  signedAt: '06/03/2025' },
      { id: '2', name: 'Luis Pérez',     role: 'Socio fundador',  email: 'l.perez@empresa.com',   status: 'pending' },
      { id: '3', name: 'Roberto Díaz',   role: 'Apoderado legal', email: 'r.diaz@empresa.com',    status: 'pending' },
    ],
  },
};
