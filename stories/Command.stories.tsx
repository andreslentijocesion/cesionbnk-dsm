import type { Meta, StoryObj } from '@storybook/react';
import {
  Command, CommandDialog, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList, CommandSeparator,
} from '../components/ui/command';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { FileText, Users, BarChart2, Settings } from 'lucide-react';

const meta: Meta = {
  title: 'DSM/Components/Command',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

export const Inline: StoryObj = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-96">
      <CommandInput placeholder="Buscar..." />
      <CommandList>
        <CommandEmpty>Sin resultados.</CommandEmpty>
        <CommandGroup heading="Operaciones">
          <CommandItem><FileText className="mr-2 h-4 w-4" />Nueva operación</CommandItem>
          <CommandItem><FileText className="mr-2 h-4 w-4" />Cargar facturas</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Reportes">
          <CommandItem><BarChart2 className="mr-2 h-4 w-4" />Portafolio</CommandItem>
          <CommandItem><BarChart2 className="mr-2 h-4 w-4" />Concentración</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Configuración">
          <CommandItem><Users className="mr-2 h-4 w-4" />Cedentes</CommandItem>
          <CommandItem><Settings className="mr-2 h-4 w-4" />Ajustes</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Dialog: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Abrir búsqueda <kbd className="ml-2 text-xs bg-muted px-1 rounded">⌘K</kbd>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Buscar operaciones, cedentes, reportes..." />
          <CommandList>
            <CommandEmpty>Sin resultados.</CommandEmpty>
            <CommandGroup heading="Acciones">
              <CommandItem onSelect={() => setOpen(false)}>Nueva operación de factoring</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Ver portafolio</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Alertas de vencimiento</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};
