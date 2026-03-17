/**
 * PageLayout — Layout Primitives System for the DSM
 *
 * Solves the problem of content occupying the full screen without restriction.
 * Provides 4 composable primitives:
 *
 *   - PageLayout:    Max-width constraint (full | constrained | narrow | prose)
 *   - SplitLayout:   Two side-by-side panels with configurable ratio
 *   - StackLayout:   Vertical sections with consistent spacing
 *   - SectionLayout: Section with title, description and separator
 *
 * Usage:
 *   <PageLayout variant="constrained">
 *     <StackLayout gap="relaxed">
 *       <SectionLayout title="KPIs">
 *         <GridShowcase columns={4}>...</GridShowcase>
 *       </SectionLayout>
 *       <SplitLayout ratio="sidebar-right">
 *         <main>Main table</main>
 *         <aside>Filters / Summary</aside>
 *       </SplitLayout>
 *     </StackLayout>
 *   </PageLayout>
 *
 * @layer ui
 */
import * as React from "react";
import { cn } from "./utils";

/* ═══════════════════════════════════════════
   PageLayout — Content width constraint
   ═══════════════════════════════════════════ */

export type PageLayoutVariant = "full" | "constrained" | "narrow" | "prose";

export interface PageLayoutProps {
  /** Width constraint variant */
  variant?: PageLayoutVariant;
  /** Horizontal padding */
  padding?: "none" | "sm" | "md" | "lg";
  /** Center the content */
  centered?: boolean;
  children: React.ReactNode;
  className?: string;
  /** data-slot for theme specificity */
  "data-slot"?: string;
}

const pageLayoutVariants: Record<PageLayoutVariant, string> = {
  full: "w-full",
  constrained: "w-full max-w-7xl",
  narrow: "w-full max-w-3xl",
  prose: "w-full max-w-prose",
};

const pageLayoutPadding: Record<NonNullable<PageLayoutProps["padding"]>, string> = {
  none: "",
  sm: "px-4",
  md: "px-6",
  lg: "px-8",
};

export function PageLayout({
  variant = "constrained",
  padding = "none",
  centered = true,
  children,
  className,
  ...rest
}: PageLayoutProps) {
  return (
    <div
      className={cn(
        pageLayoutVariants[variant],
        pageLayoutPadding[padding],
        centered && "mx-auto",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SplitLayout — Two-panel layout
   ═══════════════════════════════════════════ */

export type SplitRatio =
  | "equal"        // 1fr 1fr          — 50% / 50%
  | "sidebar-left" // 1fr 2fr          — 33% / 67%
  | "sidebar-right"// 2fr 1fr          — 67% / 33%
  | "aside-left"   // minmax(240px,1fr) 3fr — ~25% / ~75%
  | "aside-right"; // 3fr minmax(240px,1fr) — ~75% / ~25%

export interface SplitLayoutProps {
  /** Panel ratio preset */
  ratio?: SplitRatio;
  /** Gap between panels */
  gap?: "sm" | "md" | "lg";
  /** Make the smaller panel sticky on scroll */
  stickyPanel?: "left" | "right" | "none";
  /** Stack breakpoint — when to go vertical */
  stackBelow?: "sm" | "md" | "lg";
  /** Reverse stack order on mobile (useful when sidebar is on right) */
  reverseOnStack?: boolean;
  children: [React.ReactNode, React.ReactNode];
  className?: string;
}

const splitRatioClasses: Record<SplitRatio, string> = {
  equal: "lg:grid-cols-2",
  "sidebar-left": "lg:grid-cols-[1fr_2fr]",
  "sidebar-right": "lg:grid-cols-[2fr_1fr]",
  "aside-left": "lg:grid-cols-[minmax(240px,1fr)_3fr]",
  "aside-right": "lg:grid-cols-[3fr_minmax(240px,1fr)]",
};

const splitRatioClassesMd: Record<SplitRatio, string> = {
  equal: "md:grid-cols-2",
  "sidebar-left": "md:grid-cols-[1fr_2fr]",
  "sidebar-right": "md:grid-cols-[2fr_1fr]",
  "aside-left": "md:grid-cols-[minmax(220px,1fr)_3fr]",
  "aside-right": "md:grid-cols-[3fr_minmax(220px,1fr)]",
};

const splitRatioClassesSm: Record<SplitRatio, string> = {
  equal: "sm:grid-cols-2",
  "sidebar-left": "sm:grid-cols-[1fr_2fr]",
  "sidebar-right": "sm:grid-cols-[2fr_1fr]",
  "aside-left": "sm:grid-cols-[minmax(200px,1fr)_3fr]",
  "aside-right": "sm:grid-cols-[3fr_minmax(200px,1fr)]",
};

const splitGapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export function SplitLayout({
  ratio = "equal",
  gap = "md",
  stickyPanel = "none",
  stackBelow = "lg",
  reverseOnStack = false,
  children,
  className,
}: SplitLayoutProps) {
  const breakpointClasses =
    stackBelow === "sm"
      ? splitRatioClassesSm
      : stackBelow === "md"
        ? splitRatioClassesMd
        : splitRatioClasses;

  const [left, right] = children;

  return (
    <div
      className={cn(
        "grid grid-cols-1",
        breakpointClasses[ratio],
        splitGapClasses[gap],
        reverseOnStack && "flex-col-reverse",
        className
      )}
    >
      <div
        className={cn(
          stickyPanel === "left" && "lg:sticky lg:top-4 lg:self-start",
          reverseOnStack && "order-2 lg:order-1"
        )}
      >
        {left}
      </div>
      <div
        className={cn(
          stickyPanel === "right" && "lg:sticky lg:top-4 lg:self-start",
          reverseOnStack && "order-1 lg:order-2"
        )}
      >
        {right}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   StackLayout — Vertical section stacking
   ═══════════════════════════════════════════ */

export type StackGap = "compact" | "default" | "relaxed" | "spacious";

export interface StackLayoutProps {
  gap?: StackGap;
  /** Add a divider between each child */
  dividers?: boolean;
  children: React.ReactNode;
  className?: string;
}

const stackGapClasses: Record<StackGap, string> = {
  compact: "gap-4",
  default: "gap-6",
  relaxed: "gap-8",
  spacious: "gap-12",
};

const stackDividerGapClasses: Record<StackGap, string> = {
  compact: "space-y-4 divide-y divide-border [&>*+*]:pt-4",
  default: "space-y-6 divide-y divide-border [&>*+*]:pt-6",
  relaxed: "space-y-8 divide-y divide-border [&>*+*]:pt-8",
  spacious: "space-y-12 divide-y divide-border [&>*+*]:pt-12",
};

export function StackLayout({
  gap = "default",
  dividers = false,
  children,
  className,
}: StackLayoutProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        dividers ? stackDividerGapClasses[gap] : stackGapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SectionLayout — Labeled content section
   ═══════════════════════════════════════════ */

export interface SectionLayoutProps {
  title?: string;
  description?: string;
  /** Optional action slot (button, badge, etc.) on the right */
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SectionLayout({
  title,
  description,
  action,
  children,
  className,
}: SectionLayoutProps) {
  return (
    <section className={cn("space-y-4", className)}>
      {(title || description || action) && (
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            {title && (
              <h3 className="font-medium text-foreground">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}