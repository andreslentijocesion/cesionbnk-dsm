import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link: "text-secondary dark:text-primary underline-offset-4 hover:underline",

        /* ── Semantic Action Variants (Solid) ── */
        success:
          "bg-success text-success-foreground hover:brightness-110 focus-visible:ring-success/20 dark:focus-visible:ring-success/40",
        warning:
          "bg-warning text-warning-foreground hover:brightness-110 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40",
        info:
          "bg-info text-info-foreground hover:brightness-110 focus-visible:ring-info/20 dark:focus-visible:ring-info/40",

        /* ── Semantic Action Variants (Outline) ── */
        "destructive-outline":
          "border border-destructive/30 bg-transparent text-destructive hover:bg-destructive/10 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        "success-outline":
          "border border-success/30 bg-transparent text-success hover:bg-success/10 focus-visible:ring-success/20 dark:focus-visible:ring-success/40",
        "warning-outline":
          "border border-warning/30 bg-transparent text-warning hover:bg-warning/10 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40",
        "info-outline":
          "border border-info/30 bg-transparent text-info hover:bg-info/10 focus-visible:ring-info/20 dark:focus-visible:ring-info/40",

        /* ── Semantic Action Variants (Ghost) ── */
        "destructive-ghost":
          "text-destructive hover:bg-destructive/10",
        "success-ghost":
          "text-success hover:bg-success/10",
        "warning-ghost":
          "text-warning hover:bg-warning/10",
        "info-ghost":
          "text-info hover:bg-info/10",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-7",
        "icon-lg": "size-11",
      },
      shape: {
        default: "rounded-[var(--button-radius,var(--radius))]",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, shape, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, shape, className }))}
      {...props}
    />
  );
});

Button.displayName = "Button";

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export { Button, buttonVariants };
export type { ButtonProps };