import React, { useRef, useState } from "react";
import { cn } from "../ui/utils";

interface VirtualizedListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number, style: React.CSSProperties) => React.ReactNode;
  className?: string;
}

export function VirtualizedList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  className,
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(height / itemHeight);
  const endIndex = Math.min(items.length, startIndex + visibleCount + 5);
  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={scrollRef}
      className={cn("overflow-y-auto relative w-full", className)}
      style={{ height } as React.CSSProperties}
      onScroll={onScroll}
    >
      <div className="relative w-full" style={{ height: totalHeight } as React.CSSProperties}>
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;
          const style: React.CSSProperties = {
            height: itemHeight,
            transform: `translateY(${offsetY + index * itemHeight}px)`,
          };
          
          const element = renderItem(item, actualIndex, {
            ...style,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          });

          if (React.isValidElement(element)) {
            return React.cloneElement(element as React.ReactElement, { key: actualIndex });
          }
          return (
            <div
              key={actualIndex}
              className="absolute top-0 left-0 right-0"
              style={style}
            >
              {element}
            </div>
          );
        })}
      </div>
    </div>
  );
}
