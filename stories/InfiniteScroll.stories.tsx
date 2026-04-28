import type { Meta, StoryObj } from '@storybook/react';
import { useState, useCallback } from 'react';
import { InfiniteScroll } from '../components/advanced/InfiniteScroll';
import { Badge } from '../components/ui/Badge';

const meta: Meta = {
  title: 'DSM/Advanced/InfiniteScroll',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

function generateItems(page: number, size = 10) {
  return Array.from({ length: size }, (_, i) => {
    const idx = page * size + i;
    return {
      id: idx,
      folio: `F-${String(idx + 1).padStart(5, '0')}`,
      debtor: `Deudor ${String.fromCharCode(65 + (idx % 26))} S.A.`,
      amount: `$${((idx + 1) * 850000).toLocaleString('es-CO')}`,
      status: (['Pendiente', 'Aprobada', 'Cobrada', 'Vencida'] as const)[idx % 4],
    };
  });
}

const statusVariant = {
  Pendiente: 'warning-soft' as const,
  Aprobada: 'success-soft' as const,
  Cobrada: 'neutral-soft' as const,
  Vencida: 'destructive-soft' as const,
};

export const Default: StoryObj = {
  render: () => {
    const [items, setItems] = useState(() => generateItems(0));
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = useCallback(async () => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      const next = generateItems(page);
      setItems((prev) => [...prev, ...next]);
      setPage((p) => p + 1);
      if (page >= 4) setHasMore(false);
      setIsLoading(false);
    }, [page]);

    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-3 text-sm text-muted-foreground">{items.length} facturas cargadas</div>
        <div className="border rounded-lg overflow-hidden h-96 overflow-y-auto">
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} isLoading={isLoading}>
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-4 py-3 text-sm">
                  <span className="font-mono text-xs text-muted-foreground w-20">{item.folio}</span>
                  <span className="flex-1 px-3 truncate">{item.debtor}</span>
                  <span className="font-medium w-28 text-right">{item.amount}</span>
                  <Badge variant={statusVariant[item.status]} className="ml-3 text-xs">{item.status}</Badge>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
        {!hasMore && (
          <p className="text-center text-xs text-muted-foreground mt-2">— Fin del listado —</p>
        )}
      </div>
    );
  },
};
