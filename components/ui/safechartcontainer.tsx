import React, { useRef, useState, useEffect, useCallback, ReactElement } from "react";
import { cn } from "./utils";

/**
 * SafeChartContainer - Drop-in replacement for Recharts' ResponsiveContainer
 * 
 * Eliminates the {width: 0, height: 0} initialization bug and 
 * provides a stable container for charts using ResizeObserver.
 */
interface SafeChartContainerProps {
  children: ReactElement;
  className?: string;
  width?: string | number;
  height?: string | number;
  minHeight?: string | number;
  loadingContent?: React.ReactNode;
  style?: React.CSSProperties;
}

export function SafeChartContainer({
  children,
  className,
  width = "100%",
  height = "100%",
  minHeight,
  loadingContent = <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs italic">Cargando gráfico...</div>,
  style,
}: SafeChartContainerProps) {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    // Use requestAnimationFrame to debounce and prevent "ResizeObserver loop limit exceeded"
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          setSize((prev) => {
            if (prev && Math.abs(prev.w - w) < 1 && Math.abs(prev.h - h) < 1) return prev;
            return { w, h };
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, [handleResize]);

  return (
    <div
      ref={containerRef}
      className={cn("min-w-0 overflow-hidden", className)}
      style={{
        width,
        height,
        minHeight,
        position: "relative",
        ...style,
      }}
    >
      {size
        ? React.cloneElement(children, {
            width: size.w,
            height: size.h,
          })
        : loadingContent}
    </div>
  );
}
