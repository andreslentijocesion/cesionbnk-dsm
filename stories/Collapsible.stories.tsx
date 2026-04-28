import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { Button } from '../components/ui/button';
import { ChevronDown } from 'lucide-react';

const meta: Meta = {
  title: 'DSM/Components/Collapsible',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-96 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Documentos adjuntos</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-3 text-sm">Factura_001.pdf</div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 text-sm">Factura_002.pdf</div>
          <div className="rounded-md border px-4 py-3 text-sm">Contrato_cedente.pdf</div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
