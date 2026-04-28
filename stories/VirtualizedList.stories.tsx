import type { Meta, StoryObj } from '@storybook/react';
import { VirtualizedList } from '../components/advanced/VirtualizedList';

const meta: Meta = {
  title: 'DSM/Advanced/VirtualizedList',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

interface Invoice {
  id: string;
  folio: string;
  amount: string;
  debtor: string;
  status: string;
}

const invoices: Invoice[] = Array.from({ length: 500 }, (_, i) => ({
  id: `inv-${i}`,
  folio: `F-${String(i + 1).padStart(5, '0')}`,
  amount: `$${((i + 1) * 123456).toLocaleString('es-CO')}`,
  debtor: `Deudor ${String.fromCharCode(65 + (i % 26))} S.A.`,
  status: ['Pendiente', 'Aprobada', 'Vencida', 'Cobrada'][i % 4],
}));

export const Default: StoryObj = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-muted text-sm font-medium text-muted-foreground border-b">
        <span>Folio</span>
        <span>Deudor</span>
        <span>Monto</span>
        <span>Estado</span>
      </div>
      <VirtualizedList
        items={invoices}
        height={400}
        itemHeight={48}
        renderItem={(item, _index, style) => (
          <div key={item.id} style={style} className="grid grid-cols-4 gap-4 px-4 items-center border-b text-sm h-12">
            <span className="font-mono text-xs">{item.folio}</span>
            <span className="truncate">{item.debtor}</span>
            <span className="font-medium">{item.amount}</span>
            <span className="text-muted-foreground">{item.status}</span>
          </div>
        )}
      />
      <div className="px-4 py-2 border-t text-xs text-muted-foreground bg-muted">
        {invoices.length} facturas — virtualizado
      </div>
    </div>
  ),
};
