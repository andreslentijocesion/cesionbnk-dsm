import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border *:data-[slot=alert-description]:text-muted-foreground",
        destructive:
          "border-destructive/30 bg-destructive/8 text-destructive [&>svg]:text-destructive *:data-[slot=alert-description]:text-destructive/80 dark:border-destructive/30 dark:bg-destructive/10 dark:text-destructive",
        success:
          "border-success/30 bg-success/8 text-success [&>svg]:text-success *:data-[slot=alert-description]:text-success/80 dark:border-success/30 dark:bg-success/10 dark:text-success",
        warning:
          "border-warning/30 bg-warning/8 text-warning [&>svg]:text-warning *:data-[slot=alert-description]:text-warning/80 dark:border-warning/30 dark:bg-warning/10 dark:text-warning",
        info:
          "border-info/30 bg-info/8 text-info [&>svg]:text-info *:data-[slot=alert-description]:text-info/80 dark:border-info/30 dark:bg-info/10 dark:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };