/**
 * CurrencyInput — Formatted number/currency/percentage input
 * Handles CLP formatting, USD, and percentage mode.
 * @layer atoms
 */
import * as React from "react";
import { cn } from "./utils";
import { inputVariants } from "./input";
import type { VariantProps } from "class-variance-authority";

export type CurrencyInputMode = "clp" | "usd" | "percent" | "number";

export interface CurrencyInputProps
  extends Omit<React.ComponentProps<"input">, "size" | "onChange" | "value" | "type">,
    VariantProps<typeof inputVariants> {
  /** Current numeric value */
  value?: number | null;
  /** Called with the parsed numeric value (or null if empty/invalid) */
  onChange?: (value: number | null) => void;
  mode?: CurrencyInputMode;
  /** Number of decimal places (default: 0 for CLP, 2 for USD/percent) */
  decimals?: number;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Show the currency/percent prefix/suffix inline */
  showSymbol?: boolean;
}

const MODE_DEFAULTS: Record<CurrencyInputMode, { decimals: number; prefix: string; suffix: string; locale: string }> = {
  clp:     { decimals: 0, prefix: "$",  suffix: "",  locale: "es-CL" },
  usd:     { decimals: 2, prefix: "US$", suffix: "", locale: "en-US" },
  percent: { decimals: 2, prefix: "",   suffix: "%", locale: "es-CL" },
  number:  { decimals: 0, prefix: "",   suffix: "",  locale: "es-CL" },
};

function formatNumber(value: number, decimals: number, locale: string): string {
  return value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function parseRaw(raw: string): number | null {
  // Strip everything except digits, dot, comma, minus
  const cleaned = raw.replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", ".");
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      value,
      onChange,
      mode = "clp",
      decimals,
      min,
      max,
      showSymbol = true,
      size,
      className,
      onBlur,
      onFocus,
      disabled,
      placeholder,
      ...props
    },
    ref
  ) => {
    const cfg = MODE_DEFAULTS[mode];
    const dec = decimals ?? cfg.decimals;

    const [focused, setFocused] = React.useState(false);
    const [rawInput, setRawInput] = React.useState<string>("");

    // Formatted display when not focused
    const formattedValue =
      value !== null && value !== undefined
        ? formatNumber(value, dec, cfg.locale)
        : "";

    const displayValue = focused ? rawInput : formattedValue;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      // Seed raw with formatted (without thousand separators)
      if (value !== null && value !== undefined) {
        setRawInput(
          value.toLocaleString("en-US", {
            minimumFractionDigits: dec,
            maximumFractionDigits: dec,
            useGrouping: false,
          })
        );
      } else {
        setRawInput("");
      }
      onFocus?.(e);
      // Select all on focus
      setTimeout(() => e.target.select(), 0);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      const parsed = rawInput === "" ? null : parseRaw(rawInput);
      if (parsed !== null && min !== undefined && parsed < min) {
        onChange?.(min);
      } else if (parsed !== null && max !== undefined && parsed > max) {
        onChange?.(max);
      } else {
        onChange?.(parsed);
      }
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Allow only digits, comma, dot, minus at start
      const raw = e.target.value.replace(/[^\d.,-]/g, "");
      setRawInput(raw);
    };

    const prefix = showSymbol ? cfg.prefix : "";
    const suffix = showSymbol ? cfg.suffix : "";

    if (!prefix && !suffix) {
      return (
        <input
          {...props}
          ref={ref}
          type="text"
          inputMode="decimal"
          disabled={disabled}
          value={displayValue}
          placeholder={placeholder ?? (mode === "clp" ? "0" : mode === "percent" ? "0.00" : "0.00")}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={cn(inputVariants({ size, className }))}
        />
      );
    }

    return (
      <div className="relative flex items-center">
        {prefix && (
          <span className="pointer-events-none absolute left-3 select-none text-sm text-muted-foreground">
            {prefix}
          </span>
        )}
        <input
          {...props}
          ref={ref}
          type="text"
          inputMode="decimal"
          disabled={disabled}
          value={displayValue}
          placeholder={placeholder ?? (mode === "clp" ? "0" : "0.00")}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={cn(
            inputVariants({ size, className }),
            prefix && "pl-9",
            suffix && "pr-9"
          )}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 select-none text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";
