import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card';
import { Badge } from '../components/ui/badge';

const meta: Meta = {
  title: 'DSM/Components/HoverCard',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="underline decoration-dotted cursor-pointer text-sm font-medium">Constructora del Norte S.A.</span>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Constructora del Norte S.A.</h4>
            <Badge variant="success-soft">Activo</Badge>
          </div>
          <p className="text-xs text-muted-foreground">RUT: 76.123.456-7</p>
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div><p className="text-muted-foreground">Cartera</p><p className="font-medium">$4.2M</p></div>
            <div><p className="text-muted-foreground">Facturas</p><p className="font-medium">38</p></div>
            <div><p className="text-muted-foreground">Mora</p><p className="font-medium text-destructive">2.1%</p></div>
            <div><p className="text-muted-foreground">Score</p><p className="font-medium">AA</p></div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
