import { ComponentShowcase } from "../components/ui/component-showcase";
import { VirtualizedList } from "../components/advanced/virtualized-list";

const virtualizedListCode = `import { VirtualizedList } from "@/components/advanced/virtualized-list";

export function VirtualizedListDemo() {
  const items = Array.from({ length: 1000 }, (_, i) => ({ id: i, label: \`Item \${i}\` }));

  return (
    <VirtualizedList 
      height={300}
      itemHeight={50}
      items={items}
      renderItem={(item, index, style) => (
        <div style={style} className="flex items-center px-4 border-b hover:bg-muted">
          Row {item.label}
        </div>
      )}
    />
  );
}`;

export function VirtualizedListPage() {
  const items = Array.from({ length: 1000 }, (_, i) => ({ id: i, label: `Item ${i}` }));

  return (
    <ComponentShowcase
      title="Virtualized List"
      description="Renderizado eficiente de grandes listas de datos."
      category="Advanced"
      preview={
        <VirtualizedList 
          height={300}
          itemHeight={50}
          items={items}
          renderItem={(item, index, style) => (
            <div style={style} className="flex items-center px-4 border-b hover:bg-muted">
              Row {item.label}
            </div>
          )}
        />
      }
      code={virtualizedListCode}
    />
  );
}