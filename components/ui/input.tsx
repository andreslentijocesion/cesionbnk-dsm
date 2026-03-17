import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-input-background border-input flex w-full min-w-0 rounded-md border transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 py-1 text-xs file:text-xs file:h-6",
        default: "h-9 px-3 py-1 text-base md:text-sm file:text-sm file:h-7",
        lg: "h-10 px-4 py-2 text-base md:text-sm file:text-sm file:h-7",
        xl: "h-12 px-5 py-2.5 text-base file:text-base file:h-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(inputVariants({ size, className }))}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };