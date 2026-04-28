import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const meta: Meta = {
  title: 'DSM/Components/Card',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Título de la tarjeta</CardTitle>
        <CardDescription>Descripción o subtítulo de apoyo.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Contenido principal de la tarjeta.</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm">Cancelar</Button>
        <Button size="sm">Confirmar</Button>
      </CardFooter>
    </Card>
  ),
};

export const KpiCard: Story = {
  name: 'Patrón — KPI',
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[480px]">
      {[
        { label: 'Portafolio activo', value: '$1.240.000.000', delta: '+12%', variant: 'success-soft' },
        { label: 'Facturas vencidas', value: '14', delta: '+3', variant: 'destructive-soft' },
        { label: 'Tasa promedio', value: '2.4% MV', delta: '–0.1%', variant: 'info-soft' },
        { label: 'Cedentes activos', value: '38', delta: '+2', variant: 'success-soft' },
      ].map(({ label, value, delta, variant }) => (
        <Card key={label} className="p-4">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          <Badge variant={variant as any} className="mt-2">{delta}</Badge>
        </Card>
      ))}
    </div>
  ),
};

export const OperationCard: Story = {
  name: 'Patrón — Operación factoring',
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">FAC-2025-00123</CardTitle>
            <CardDescription>Empresa Constructora Sur Ltda.</CardDescription>
          </div>
          <Badge variant="success-soft-outline">Aprobado</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-muted-foreground text-xs">Valor nominal</p>
          <p className="font-medium">$45.000.000</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Tasa</p>
          <p className="font-medium">2.2% MV</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Deudor</p>
          <p className="font-medium">Retailer ABC</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Vencimiento</p>
          <p className="font-medium">15 Mar 2025</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">Ver detalle</Button>
        <Button size="sm" className="flex-1">Desembolsar</Button>
      </CardFooter>
    </Card>
  ),
};
