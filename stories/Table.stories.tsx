import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { MoreHorizontal } from 'lucide-react';

const meta: Meta = { title: 'DSM/Components/Table', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

const rows = [
  { id: 'FAC-001', cedente: 'Constructora Sur', monto: '$45.000.000', tasa: '2.2%', status: 'aprobado' },
  { id: 'FAC-002', cedente: 'Servicios TI SpA', monto: '$12.500.000', tasa: '2.5%', status: 'desembolsado' },
  { id: 'FAC-003', cedente: 'Transporte Rápido', monto: '$8.300.000', tasa: '2.8%', status: 'vencido' },
  { id: 'FAC-004', cedente: 'Alimentos Norte', monto: '$31.000.000', tasa: '2.1%', status: 'cobrado' },
];

const statusVariant: Record<string, any> = {
  aprobado: 'success-soft-outline',
  desembolsado: 'info-soft-outline',
  vencido: 'destructive-soft',
  cobrado: 'success-soft',
};

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Portafolio de factoring — últimas operaciones</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Folio</TableHead>
          <TableHead>Cedente</TableHead>
          <TableHead className="text-right">Monto</TableHead>
          <TableHead>Tasa</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id}>
            <TableCell className="font-mono text-xs text-muted-foreground">{r.id}</TableCell>
            <TableCell className="font-medium">{r.cedente}</TableCell>
            <TableCell className="text-right tabular-nums">{r.monto}</TableCell>
            <TableCell>{r.tasa} MV</TableCell>
            <TableCell>
              <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total portafolio</TableCell>
          <TableCell className="text-right font-semibold">$96.800.000</TableCell>
          <TableCell colSpan={2} />
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithActions: Story = {
  name: 'Con acciones por fila',
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Folio</TableHead>
          <TableHead>Cedente</TableHead>
          <TableHead className="text-right">Monto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="w-10"><span className="sr-only">Acciones</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id} className="cursor-pointer hover:bg-muted/40">
            <TableCell className="font-mono text-xs text-muted-foreground">{r.id}</TableCell>
            <TableCell className="font-medium">{r.cedente}</TableCell>
            <TableCell className="text-right tabular-nums">{r.monto}</TableCell>
            <TableCell><Badge variant={statusVariant[r.status]}>{r.status}</Badge></TableCell>
            <TableCell>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
