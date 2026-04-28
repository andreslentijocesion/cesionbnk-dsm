import type { Meta, StoryObj } from '@storybook/react';
import { AuditLog, type AuditEntry } from '../components/patterns/audit-log';

const defaultEntries: AuditEntry[] = [
  { id: '1', timestamp: '07/03/2025 09:14', user: 'Ana Valdés',      role: 'Analista',  action: 'approve', entity: 'Operación', entityId: 'FCT-2025-003', description: 'Operación FCT-2025-003 aprobada por comité de crédito.', source: '192.168.1.10' },
  { id: '2', timestamp: '07/03/2025 11:32', user: 'Carlos Riquelme', role: 'Gerente',   action: 'update',  entity: 'Cedente',   entityId: 'CED-456',      description: 'Score crediticio actualizado a 720.',                   source: '192.168.1.22' },
  { id: '3', timestamp: '06/03/2025 14:05', user: 'María González',  role: 'Ejecutivo', action: 'create',  entity: 'Operación', entityId: 'FCT-2025-008', description: 'Nueva operación radicada por Pharma Colombia Ltda.',     source: '192.168.1.15' },
  { id: '4', timestamp: '06/03/2025 16:48', user: 'Sistema',         role: 'Sistema',   action: 'export',  entity: 'Reporte',   entityId: 'RPT-2025-02',  description: 'Reporte de portafolio exportado en formato XLSX.',       source: 'system'       },
  { id: '5', timestamp: '05/03/2025 08:20', user: 'Ana Valdés',      role: 'Analista',  action: 'reject',  entity: 'Operación', entityId: 'FCT-2025-009', description: 'Operación rechazada por documentación incompleta.',       source: '192.168.1.10' },
];

const meta: Meta<typeof AuditLog> = {
  title: 'DSM/Patterns/AuditLog',
  component: AuditLog,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { entries: defaultEntries },
};

export default meta;
type Story = StoryObj<typeof AuditLog>;
export const Default: Story = {};
