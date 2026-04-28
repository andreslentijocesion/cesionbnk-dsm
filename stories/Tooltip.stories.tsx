import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';
import { Button } from '../components/ui/button';
import { HelpCircle } from 'lucide-react';

const meta: Meta = {
  title: 'DSM/Components/Tooltip',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover aquí</Button>
      </TooltipTrigger>
      <TooltipContent>Este es el tooltip</TooltipContent>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-6 items-center justify-center p-16">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const OnIcon: Story = {
  name: 'Patrón — Ayuda contextual',
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Tasa de descuento</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <HelpCircle className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-56 text-center">
          Porcentaje mensual aplicado sobre el valor nominal de la factura
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const OnDisabledButton: Story = {
  name: 'Patrón — Botón deshabilitado con explicación',
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0}>
          <Button disabled>Desembolsar</Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>Requiere aprobación del comité de crédito</TooltipContent>
    </Tooltip>
  ),
};
