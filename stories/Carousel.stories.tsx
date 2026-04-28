import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/Carousel';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const meta: Meta = {
  title: 'DSM/Components/Carousel',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div className="w-full max-w-lg mx-auto">
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }, (_, i) => (
            <CarouselItem key={i}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{i + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const FactoringCards: StoryObj = {
  name: 'Factoring — Tarjetas de operación',
  render: () => {
    const ops = [
      { id: 'OP-001', cedent: 'Constructora del Norte', amount: '$3.250.000', status: 'En análisis', badge: 'warning-soft' as const },
      { id: 'OP-002', cedent: 'Logística Central Ltda.', amount: '$1.820.000', status: 'Aprobada', badge: 'success-soft' as const },
      { id: 'OP-003', cedent: 'Distribuidora Sur S.A.', amount: '$4.100.000', status: 'Vencida', badge: 'destructive-soft' as const },
      { id: 'OP-004', cedent: 'Tech Solutions SpA', amount: '$980.000', status: 'Cobrada', badge: 'neutral-soft' as const },
    ];
    return (
      <div className="w-full max-w-xs mx-auto">
        <Carousel opts={{ align: 'start' }}>
          <CarouselContent>
            {ops.map((op) => (
              <CarouselItem key={op.id}>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm">{op.id}</CardTitle>
                      <Badge variant={op.badge}>{op.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{op.cedent}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{op.amount}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  },
};
