/**
 * TagInput — Multi-value tag/chip input
 * Type and press Enter or comma to add. Click × to remove.
 * @layer atoms
 */
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "./utils";

export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  /** Maximum number of tags */
  max?: number;
  /** Delimiters that trigger tag creation (default: Enter + comma) */
  delimiters?: string[];
  disabled?: boolean;
  className?: string;
  /** Validate a tag before adding. Return false to reject. */
  validate?: (tag: string) => boolean;
  /** Tag color variant */
  variant?: "default" | "secondary" | "outline";
}

const variantStyles: Record<NonNullable<TagInputProps["variant"]>, string> = {
  default:   "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline:   "bg-background border border-border text-foreground",
};

export function TagInput({
  value,
  onChange,
  placeholder = "Agregar etiqueta...",
  max,
  delimiters = [","],
  disabled,
  className,
  validate,
  variant = "secondary",
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (value.includes(tag)) { setInputValue(""); return; }
    if (max && value.length >= max) return;
    if (validate && !validate(tag)) return;
    onChange([...value, tag]);
    setInputValue("");
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const lastChar = raw.slice(-1);
    if (delimiters.includes(lastChar)) {
      addTag(raw.slice(0, -1));
    } else {
      setInputValue(raw);
    }
  };

  const atMax = max !== undefined && value.length >= max;

  return (
    <div
      className={cn(
        "flex flex-wrap gap-1.5 p-2 rounded-md border border-input bg-input-background min-h-9 cursor-text transition-[box-shadow] focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag, i) => (
        <span
          key={i}
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
            variantStyles[variant]
          )}
        >
          {tag}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); removeTag(i); }}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity"
            tabIndex={-1}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      {!atMax && (
        <input
          ref={inputRef}
          type="text"
          className="flex-1 min-w-24 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          placeholder={value.length === 0 ? placeholder : ""}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
      )}
      {atMax && (
        <span className="text-xs text-muted-foreground self-center ml-1">Máx. {max}</span>
      )}
    </div>
  );
}
