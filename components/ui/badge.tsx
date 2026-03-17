import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        /* ── Base Variants ── */
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        neutral:
          "border-transparent bg-muted text-muted-foreground [a&]:hover:bg-muted/90",

        /* ── Semantic Solid ── */
        destructive:
          "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90",
        success:
          "border-transparent bg-success text-success-foreground [a&]:hover:bg-success/90",
        warning:
          "border-transparent bg-warning text-warning-foreground [a&]:hover:bg-warning/90",
        info:
          "border-transparent bg-info text-info-foreground [a&]:hover:bg-info/90",

        /* ── Semantic Outline ── */
        "destructive-outline":
          "border-destructive/40 bg-transparent text-destructive-on-subtle [a&]:hover:bg-destructive-subtle dark:border-destructive/30 dark:text-destructive/80 dark:[a&]:hover:bg-destructive/10",
        "success-outline":
          "border-success/40 bg-transparent text-success-on-subtle [a&]:hover:bg-success-subtle dark:border-success/30 dark:text-success/80 dark:[a&]:hover:bg-success/10",
        "warning-outline":
          "border-warning/40 bg-transparent text-warning-on-subtle [a&]:hover:bg-warning-subtle dark:border-warning/30 dark:text-warning/80 dark:[a&]:hover:bg-warning/10",
        "info-outline":
          "border-info/40 bg-transparent text-info-on-subtle [a&]:hover:bg-info-subtle dark:border-info/30 dark:text-info/80 dark:[a&]:hover:bg-info/10",

        /* ── Semantic Soft (tinted bg + colored text) ── */
        "destructive-soft":
          "border-transparent bg-destructive-subtle text-destructive-on-subtle [a&]:hover:bg-destructive/15 dark:bg-destructive/15 dark:text-destructive/80 dark:[a&]:hover:bg-destructive/25",
        "success-soft":
          "border-transparent bg-success-subtle text-success-on-subtle [a&]:hover:bg-success/15 dark:bg-success/15 dark:text-success/80 dark:[a&]:hover:bg-success/25",
        "warning-soft":
          "border-transparent bg-warning-subtle text-warning-on-subtle [a&]:hover:bg-warning/15 dark:bg-warning/15 dark:text-warning/80 dark:[a&]:hover:bg-warning/25",
        "info-soft":
          "border-transparent bg-info-subtle text-info-on-subtle [a&]:hover:bg-info/15 dark:bg-info/15 dark:text-info/80 dark:[a&]:hover:bg-info/25",

        /* ── Semantic Soft-Outline (tinted bg + colored border + colored text) ── */
        "destructive-soft-outline":
          "border-destructive/40 bg-destructive-subtle text-destructive-on-subtle [a&]:hover:bg-destructive/15 dark:border-destructive/40 dark:bg-destructive/15 dark:text-destructive/80 dark:[a&]:hover:bg-destructive/25",
        "success-soft-outline":
          "border-success/40 bg-success-subtle text-success-on-subtle [a&]:hover:bg-success/15 dark:border-success/40 dark:bg-success/15 dark:text-success/80 dark:[a&]:hover:bg-success/25",
        "warning-soft-outline":
          "border-warning/40 bg-warning-subtle text-warning-on-subtle [a&]:hover:bg-warning/15 dark:border-warning/40 dark:bg-warning/15 dark:text-warning/80 dark:[a&]:hover:bg-warning/25",
        "info-soft-outline":
          "border-info/40 bg-info-subtle text-info-on-subtle [a&]:hover:bg-info/15 dark:border-info/40 dark:bg-info/15 dark:text-info/80 dark:[a&]:hover:bg-info/25",

        /* ── Neutral (muted — draft, created, discarded, inactive, archived) ── */
        "neutral-soft":
          "border-transparent bg-muted text-muted-foreground [a&]:hover:bg-muted/70",
        "neutral-soft-outline":
          "border-border bg-muted text-muted-foreground [a&]:hover:bg-muted/70",

        /* ── Secondary (brand — endorsed, negotiated, brand-flow states) ── */
        "secondary-soft":
          "border-transparent bg-secondary-subtle text-secondary-on-subtle [a&]:hover:bg-secondary/20 dark:bg-secondary/25 dark:text-secondary/80 dark:[a&]:hover:bg-secondary/35",
        "secondary-soft-outline":
          "border-secondary/30 bg-secondary-subtle text-secondary-on-subtle [a&]:hover:bg-secondary/20 dark:border-secondary/50 dark:bg-secondary/25 dark:text-secondary/80 dark:[a&]:hover:bg-secondary/35",

        /* ── Purple (secondary brand alias — special / premium states) ── */
        "purple-soft-outline":
          "border-secondary/40 bg-secondary-subtle text-secondary-on-subtle [a&]:hover:bg-secondary/20 dark:border-secondary/40 dark:bg-secondary/15 dark:text-secondary/80 dark:[a&]:hover:bg-secondary/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };