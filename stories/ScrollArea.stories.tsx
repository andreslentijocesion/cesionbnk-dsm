import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea, ScrollBar } from '../components/ui/scroll-area';

const meta: Meta = {
  title: 'DSM/Components/ScrollArea',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

const invoices = Array.from({ length: 30 }, (_, i) => ({
  folio: `F-${String(i + 1).padStart(4, '0')}`,
  debtor: `Empresa ${String.fromCharCode(65 + (i % 10))} Ltda.`,
  amount: `$${((i + 1) * 420000).toLocaleString('es-CL')}`,
}));

export const Vertical: StoryObj = {
  render: () => (
    <ScrollArea className="h-72 w-80 rounded-md border">
      <div className="p-4 space-y-2">
        {invoices.map((inv) => (
          <div key={inv.folio} className="flex justify-between text-sm py-1 border-b last:border-0">
            <span className="font-mono text-xs text-muted-foreground">{inv.folio}</span>
            <span className="truncate flex-1 px-3">{inv.debtor}</span>
            <span className="font-medium">{inv.amount}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: StoryObj = {
  render: () => (
    <ScrollArea className="w-80 whitespace-nowrap rounded-md border">
      <div className="flex gap-3 p-4">
        {invoices.slice(0, 15).map((inv) => (
          <div key={inv.folio} className="w-40 rounded-lg border p-3 flex-shrink-0 text-sm">
            <p className="font-mono text-xs text-muted-foreground">{inv.folio}</p>
            <p className="font-medium mt-1 truncate">{inv.debtor}</p>
            <p className="text-muted-foreground text-xs mt-1">{inv.amount}</p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
