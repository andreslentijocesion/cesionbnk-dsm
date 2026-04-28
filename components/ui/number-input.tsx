import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "size"> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  size?: "sm" | "default" | "lg";
  showControls?: boolean;
}

const sizeClasses = {
  sm:      { input: "h-8 text-xs px-2",  btn: "h-8 w-8",  icon: 13 },
  default: { input: "h-9 text-sm px-3",  btn: "h-9 w-9",  icon: 14 },
  lg:      { input: "h-11 text-base px-4", btn: "h-11 w-11", icon: 16 },
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onChange,
      min,
      max,
      step = 1,
      decimals = 0,
      suffix,
      prefix,
      size = "default",
      showControls = true,
      disabled,
      className,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const [raw, setRaw] = React.useState<string>(
      value !== undefined ? String(value) : "",
    );
    const [focused, setFocused] = React.useState(false);

    // Sync external value when not focused
    React.useEffect(() => {
      if (!focused) {
        setRaw(value !== undefined ? String(value) : "");
      }
    }, [value, focused]);

    const clamp = (n: number) => {
      let result = n;
      if (min !== undefined) result = Math.max(min, result);
      if (max !== undefined) result = Math.min(max, result);
      return parseFloat(result.toFixed(decimals));
    };

    const commit = (text: string) => {
      const parsed = parseFloat(text.replace(",", "."));
      if (!isNaN(parsed)) {
        const clamped = clamp(parsed);
        setRaw(String(clamped));
        onChange?.(clamped);
      } else {
        setRaw(value !== undefined ? String(value) : "");
      }
    };

    const increment = () => {
      const current = value ?? 0;
      const next = clamp(parseFloat((current + step).toFixed(decimals)));
      onChange?.(next);
    };

    const decrement = () => {
      const current = value ?? 0;
      const next = clamp(parseFloat((current - step).toFixed(decimals)));
      onChange?.(next);
    };

    const s = sizeClasses[size];
    const canDecrement = !disabled && (min === undefined || (value ?? 0) > min);
    const canIncrement = !disabled && (max === undefined || (value ?? 0) < max);

    return (
      <div
        className={cn(
          "flex items-center rounded-md border border-input bg-background ring-offset-background",
          focused && "ring-2 ring-ring ring-offset-2",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
      >
        {showControls && (
          <button
            type="button"
            onClick={decrement}
            disabled={!canDecrement}
            tabIndex={-1}
            className={cn(
              "flex items-center justify-center border-r border-input text-muted-foreground",
              "hover:bg-muted transition-colors rounded-l-md",
              "disabled:pointer-events-none disabled:opacity-50",
              s.btn,
            )}
          >
            <Minus size={s.icon} />
          </button>
        )}

        <div className="flex items-center flex-1 min-w-0">
          {prefix && (
            <span className="pl-2 text-muted-foreground text-sm select-none">{prefix}</span>
          )}
          <input
            ref={ref}
            type="text"
            inputMode="decimal"
            value={raw}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none text-center",
              "disabled:cursor-not-allowed",
              s.input,
              !showControls && "rounded-md",
              prefix && "pl-1",
              suffix && "pr-1",
            )}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              setFocused(false);
              commit(e.target.value);
            }}
            onChange={(e) => setRaw(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit(raw);
              if (e.key === "ArrowUp") { e.preventDefault(); increment(); }
              if (e.key === "ArrowDown") { e.preventDefault(); decrement(); }
            }}
            {...props}
          />
          {suffix && (
            <span className="pr-2 text-muted-foreground text-sm select-none">{suffix}</span>
          )}
        </div>

        {showControls && (
          <button
            type="button"
            onClick={increment}
            disabled={!canIncrement}
            tabIndex={-1}
            className={cn(
              "flex items-center justify-center border-l border-input text-muted-foreground",
              "hover:bg-muted transition-colors rounded-r-md",
              "disabled:pointer-events-none disabled:opacity-50",
              s.btn,
            )}
          >
            <Plus size={s.icon} />
          </button>
        )}
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";
