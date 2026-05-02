import { useState } from "react";
import { ComponentShowcase } from "../components/ui/componentshowcase";
import { InfiniteScroll } from "../components/advanced/infinite-scroll";

const infiniteScrollCode = `import { useState } from "react";
import { InfiniteScroll } from "@/components/advanced/infinitescroll";

export function InfiniteScrollDemo() {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i));
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setItems(prev => [...prev, ...Array.from({ length: 10 }, (_, i) => prev.length + i)]);
    setIsLoading(false);
  };

  return (
    <div className="h-[300px] overflow-auto border rounded-md p-4">
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={items.length < 100}
        isLoading={isLoading}
      >
        {items.map((item) => (
          <div key={item} className="p-4 border-b mb-2 bg-muted rounded">
            Item #{item}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}`;

export function InfiniteScrollPage() {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i));
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setItems(prev => [...prev, ...Array.from({ length: 10 }, (_, i) => prev.length + i)]);
    setIsLoading(false);
  };

  return (
    <ComponentShowcase
      title="Infinite Scroll"
      description="Automatic content loading on scroll."
      category="Advanced"
      preview={
        <div className="h-[300px] overflow-auto border rounded-md p-4 min-w-[320px]">
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={items.length < 100}
            isLoading={isLoading}
          >
            {items.map((item) => (
              <div key={item} className="p-4 border-b mb-2 bg-muted rounded">
                Item #{item}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      }
      code={infiniteScrollCode}
      props={[
        { name: "loadMore", type: "() => Promise<void>", description: "Async function that loads more data when the user reaches the end of the scroll.", required: true },
        { name: "hasMore", type: "boolean", description: "Indicates if there is more data to load. When false, stops observing the scroll.", required: true },
        { name: "isLoading", type: "boolean", default: "false", description: "Loading state. Shows spinner while loading." },
        { name: "children", type: "ReactNode", description: "Scrollable content (list of items).", required: true },
        { name: "threshold", type: "number", default: "1.0", description: "Intersection threshold (0 to 1) to trigger loading. 1.0 = fully visible." },
      ]}
      examples={[
        {
          title: "Early Loading (threshold 0.5)",
          description: "Loads data when the sentinel is 50% visible.",
          preview: (
            <div className="text-center py-6 border rounded-lg">
              <p className="text-sm text-muted-foreground">Low threshold pre-loads before reaching the end.</p>
            </div>
          ),
          code: `<InfiniteScroll
  loadMore={fetchNextPage}
  hasMore={hasNextPage}
  isLoading={isFetching}
  threshold={0.5}
>
  {invoices.map((inv) => (
    <ItemCard key={inv.id} {...inv} />
  ))}
</InfiniteScroll>`,
        },
        {
          title: "With End Message",
          description: "Shows text when there is no more data.",
          preview: (
            <div className="text-center py-6 border rounded-lg">
              <p className="text-sm text-muted-foreground">When hasMore=false, the observer disconnects.</p>
            </div>
          ),
          code: `<div className="h-[400px] overflow-auto">
  <InfiniteScroll
    loadMore={loadMore}
    hasMore={hasMore}
    isLoading={loading}
  >
    {items.map((item) => (
      <ItemRow key={item.id} {...item} />
    ))}
  </InfiniteScroll>
  {!hasMore && (
    <p className="text-center text-muted-foreground py-4">
      No more results
    </p>
  )}
</div>`,
        },
      ]}
    />
  );
}