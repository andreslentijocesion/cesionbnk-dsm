import React, { useRef, useState, useEffect, useCallback, ReactElement } from "react";
import { cn } from "./utils";

/**
 * SafeChartContainer - Drop-in replacement for Recharts' ResponsiveContainer
 * 
 * Eliminates the {width: -1, height: -1} console warning by only rendering
 * chart children AFTER measuring the container via ResizeObserver.
 * 
 * Also absorbs the role of ChartWrapper: provides a sizing container with
 * minHeight, className, and an optional loading placeholder.
 * 
 * Usage:
 *   <SafeChartContainer width="100%" height="100%" minHeight="300px">
 *     <LineChart data={data}>...</LineChart>
 *   </SafeChartContainer>
 */
interface SafeChartContainerProps {
  children: ReactElement;
  width?: string | number;
  height?: string | number;
  minHeight?: string | number;
  className?: string;
  style?: React.CSSProperties;
  /** Custom loading element. Defaults to a spinner. Pass `null` to render nothing while measuring. */
  loadingPlaceholder?: React.ReactNode | null;
}

export function SafeChartContainer({
  children,
  width = "100%",
  height = "100%",
  minHeight,
  className,
  style,
  loadingPlaceholder,
}: SafeChartContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  const updateSize = useCallback((w: number, h: number) => {
    if (w > 0 && h > 0) {
      setSize(prev => {
        if (prev && prev.w === Math.floor(w) && prev.h === Math.floor(h)) return prev;
        return { w: Math.floor(w), h: Math.floor(h) };
      });
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        updateSize(w, h);
      }
    });

    observer.observe(el);

    // Fallback: immediate measurement
    const rect = el.getBoundingClientRect();
    updateSize(rect.width, rect.height);

    return () => observer.disconnect();
  }, [updateSize]);

  const defaultLoading = (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-8 h-8 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const loadingContent = loadingPlaceholder === undefined
    ? defaultLoading
    : loadingPlaceholder;

  return (
    <div
      ref={containerRef}
      className={cn("min-w-0", className)}
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