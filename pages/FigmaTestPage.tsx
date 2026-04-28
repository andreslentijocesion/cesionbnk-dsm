/**
 * FigmaTestPage — prueba reversible de flujo diseño → código
 * Origen: https://www.figma.com/design/7Px6eScboWGb3vVXCVyQoX
 * Para eliminar: borrar este archivo y su ruta en el router
 */
import { TrendingUp, Pencil, Trash2, Download } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Button } from '../components/ui/Button';

// ── Tipos ─────────────────────────────────────────────────────────────────────

type KpiAccent = 'info' | 'warning' | 'success' | 'destructive';

interface KpiData {
  label: string;
  count: number;
  value: string;
  trend: string;
  accent: KpiAccent;
}

type InvoiceStatus = 'approved' | 'pending' | 'in-review' | 'rejected';

interface Invoice {
  id: string;
  client: string;
  amount: string;
  status: InvoiceStatus;
}

// ── Datos de ejemplo ──────────────────────────────────────────────────────────

const kpis: KpiData[] = [
  { label: 'Total Portafolio',    count: 12, value: '$1,234,567', trend: '+8.2% vs last month', accent: 'info' },
  { label: 'Pendientes Revisión', count: 12, value: '$1,234,567', trend: '+8.2% vs last month', accent: 'warning' },
  { label: 'Operaciones Activas', count: 12, value: '$1,234,567', trend: '+8.2% vs last month', accent: 'success' },
  { label: 'Vencidas',            count: 12, value: '$1,234,567', trend: '+8.2% vs last month', accent: 'destructive' },
];

const invoices: Invoice[] = [
  { id: 'INV-001', client: 'Empresa Alpha',  amount: '$12,450', status: 'approved'  },
  { id: 'INV-002', client: 'Corp Beta',      amount: '$8,320',  status: 'pending'   },
  { id: 'INV-003', client: 'Grupo Gamma',    amount: '$23,100', status: 'in-review' },
  { id: 'INV-004', client: 'Delta Holdings', amount: '$5,700',  status: 'rejected'  },
];

// ── Mapeo de estados a variantes del DSM ──────────────────────────────────────

const statusConfig: Record<InvoiceStatus, { label: string; variant: React.ComponentProps<typeof Badge>['variant'] }> = {
  'approved':  { label: 'Approved',   variant: 'success-soft-outline'     },
  'pending':   { label: 'Pending',    variant: 'warning-soft-outline'     },
  'in-review': { label: 'In Review',  variant: 'info-soft-outline'        },
  'rejected':  { label: 'Rejected',   variant: 'destructive-soft-outline' },
};

// Borde inferior del KPI card según acento
const accentBorder: Record<KpiAccent, string> = {
  info:        'border-b-4 border-info',
  warning:     'border-b-4 border-warning',
  success:     'border-b-4 border-success',
  destructive: 'border-b-4 border-destructive',
};

// Badge del contador en el KPI
const accentBadge: Record<KpiAccent, React.ComponentProps<typeof Badge>['variant']> = {
  info:        'info',
  warning:     'warning',
  success:     'success',
  destructive: 'destructive',
};

// ── Componentes ───────────────────────────────────────────────────────────────

function KpiCard({ label, count, value, trend, accent }: KpiData) {
  return (
    <Card className={`flex-1 gap-2 ${accentBorder[accent]}`}>
      <CardContent className="flex flex-col gap-2 pt-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          <Badge variant={accentBadge[accent]} className="text-[11px] px-1.5 py-0 rounded-full">
            {count}
          </Badge>
        </div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <TrendingUp className="size-3" />
          <span>{trend}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────

export default function FigmaTestPage() {
  return (
    <div className="min-h-screen bg-muted/30 p-8">
      {/* KPI Strip */}
      <div className="flex gap-6 mb-8">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Tabla de facturas */}
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="text-xs w-28">Invoice #</TableHead>
            <TableHead className="text-xs w-40">Client</TableHead>
            <TableHead className="text-xs w-28">Amount</TableHead>
            <TableHead className="text-xs w-32">Status</TableHead>
            <TableHead className="text-xs w-28">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => {
            const { label, variant } = statusConfig[inv.status];
            return (
              <TableRow key={inv.id} className="hover:bg-muted/30 cursor-pointer">
                <TableCell className="font-medium text-sm">{inv.id}</TableCell>
                <TableCell className="text-sm">{inv.client}</TableCell>
                <TableCell className="font-medium text-sm tabular-nums">{inv.amount}</TableCell>
                <TableCell>
                  <Badge variant={variant} className="text-xs">{label}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm" aria-label="Editar">
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" aria-label="Eliminar" className="text-destructive hover:text-destructive">
                      <Trash2 className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" aria-label="Descargar">
                      <Download className="size-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
