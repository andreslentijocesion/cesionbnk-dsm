/**
 * MaskedInput — Formatted input for NIT, phone, bank account and custom masks
 * NIT: auto-formats and validates check digit (Colombian DIAN format)
 * @layer atoms
 */
import * as React from "react";
import { cn } from "./utils";
import { inputVariants } from "./input";
import type { VariantProps } from "class-variance-authority";

export type MaskType = "nit" | "phone" | "bank-account" | "custom";

export interface MaskedInputProps
  extends Omit<React.ComponentProps<"input">, "size" | "onChange" | "value" | "type">,
    VariantProps<typeof inputVariants> {
  value?: string;
  onChange?: (value: string, raw: string) => void;
  mask?: MaskType;
  /** Custom mask pattern: use # for digit, A for letter, * for any. E.g. "##/##/####" */
  pattern?: string;
  /** Show validation indicator for NIT */
  showValidation?: boolean;
}

// ── NIT helpers (DIAN — Colombia) ────────────────────────────────────────────

/**
 * Colombian NIT check digit algorithm (DIAN resolution 8634/2014).
 * Multipliers applied right-to-left: 3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71
 */
function nitCheckDigit(nit: string): string {
  const digits = nit.replace(/\D/g, "");
  const multipliers = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
  let sum = 0;
  const reversed = digits.split("").reverse();
  for (let i = 0; i < reversed.length && i < multipliers.length; i++) {
    sum += parseInt(reversed[i]) * multipliers[i];
  }
  const r = sum % 11;
  if (r === 0) return "0";
  if (r === 1) return "1";
  return String(11 - r);
}

function formatNit(raw: string): string {
  const clean = raw.replace(/[^0-9]/g, "");
  if (clean.length === 0) return "";
  const body = clean.slice(0, -1);
  const dv   = clean.slice(-1);
  if (body.length === 0) return dv;
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formatted}-${dv}`;
}

function validateNit(raw: string): boolean {
  const clean = raw.replace(/\D/g, "");
  if (clean.length < 2) return false;
  const body = clean.slice(0, -1);
  const dv   = clean.slice(-1);
  return nitCheckDigit(body) === dv;
}

// ── Phone helpers (Colombia +57) ─────────────────────────────────────────────

function formatPhone(raw: string): string {
  // Colombia: +57 3XX XXX XXXX (12 digits with country code, 10 without)
  const d = raw.replace(/\D/g, "").slice(0, 12);
  if (d.startsWith("57")) {
    const local = d.slice(2); // 10-digit mobile
    if (local.length <= 3)  return `+57 ${local}`;
    if (local.length <= 6)  return `+57 ${local.slice(0, 3)} ${local.slice(3)}`;
    return `+57 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  }
  // Local format without country code (10 digits, starts with 3)
  if (d.length <= 3)  return d;
  if (d.length <= 6)  return `${d.slice(0, 3)} ${d.slice(3)}`;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 10)}`;
}

// ── Bank account ──────────────────────────────────────────────────────────────

function formatBankAccount(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 16);
  return d.replace(/(.{4})/g, "$1 ").trim();
}

// ── Custom mask ───────────────────────────────────────────────────────────────

function applyCustomMask(raw: string, pattern: string): string {
  const digits = raw.replace(/\D/g, "");
  let result = "";
  let di = 0;
  for (let i = 0; i < pattern.length && di < digits.length; i++) {
    if (pattern[i] === "#") {
      result += digits[di++];
    } else {
      result += pattern[i];
      if (pattern[i + 1] === "#") continue;
    }
  }
  return result;
}

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  (
    {
      value = "",
      onChange,
      mask = "nit",
      pattern,
      showValidation = true,
      size,
      className,
      disabled,
      placeholder,
      autoComplete,
      ...props
    },
    ref
  ) => {
    // Default autoComplete per mask — prevents browser autofill overlays
    const defaultAutoComplete: Record<MaskType, string> = {
      nit:            "off",
      phone:          "off",
      "bank-account": "off",
      custom:         "off",
    };

    const isNitValid = mask === "nit" && value.replace(/\D/g, "").length >= 7
      ? validateNit(value)
      : null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      let formatted = raw;

      if (mask === "nit") formatted = formatNit(raw);
      else if (mask === "phone") formatted = formatPhone(raw);
      else if (mask === "bank-account") formatted = formatBankAccount(raw);
      else if (mask === "custom" && pattern) formatted = applyCustomMask(raw, pattern);

      const rawDigits = formatted.replace(/\D/g, "");
      onChange?.(formatted, rawDigits);
    };

    const defaultPlaceholder = {
      nit:            "900.123.456-7",
      phone:          "+57 310 123 4567",
      "bank-account": "0000 0000 0000",
      custom:         pattern ?? "",
    }[mask];

    const validationClass =
      mask === "nit" && showValidation && isNitValid !== null
        ? isNitValid
          ? "border-success focus-visible:border-success focus-visible:ring-success/30"
          : "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30 aria-invalid:ring-0"
        : "";

    return (
      <input
        {...props}
        ref={ref}
        type="text"
        inputMode={mask === "nit" || mask === "bank-account" ? "numeric" : "tel"}
        value={value}
        disabled={disabled}
        placeholder={placeholder ?? defaultPlaceholder}
        onChange={handleChange}
        autoComplete={autoComplete ?? defaultAutoComplete[mask]}
        spellCheck={false}
        className={cn(inputVariants({ size, className }), validationClass)}
      />
    );
  }
);
MaskedInput.displayName = "MaskedInput";
