/**
 * MaskedInput — Formatted input for RUT, phone, bank account and custom masks
 * RUT: auto-formats and validates check digit (Chilean format)
 * @layer atoms
 */
import * as React from "react";
import { cn } from "./utils";
import { inputVariants } from "./input";
import type { VariantProps } from "class-variance-authority";

export type MaskType = "rut" | "phone" | "bank-account" | "custom";

export interface MaskedInputProps
  extends Omit<React.ComponentProps<"input">, "size" | "onChange" | "value" | "type">,
    VariantProps<typeof inputVariants> {
  value?: string;
  onChange?: (value: string, raw: string) => void;
  mask?: MaskType;
  /** Custom mask pattern: use # for digit, A for letter, * for any. E.g. "##/##/####" */
  pattern?: string;
  /** Show validation indicator for RUT */
  showValidation?: boolean;
}

// ── RUT helpers ──────────────────────────────────────────────────────────────

function rutCheckDigit(rut: string): string {
  const digits = rut.replace(/\D/g, "");
  let sum = 0;
  let mul = 2;
  for (let i = digits.length - 1; i >= 0; i--) {
    sum += parseInt(digits[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const r = 11 - (sum % 11);
  if (r === 11) return "0";
  if (r === 10) return "K";
  return String(r);
}

function formatRut(raw: string): string {
  const clean = raw.replace(/[^0-9kK]/g, "").toUpperCase();
  if (clean.length === 0) return "";
  const body = clean.slice(0, -1);
  const dv   = clean.slice(-1);
  if (body.length === 0) return dv;
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formatted}-${dv}`;
}

function validateRut(raw: string): boolean {
  const clean = raw.replace(/[^0-9kK]/g, "").toUpperCase();
  if (clean.length < 2) return false;
  const body = clean.slice(0, -1);
  const dv   = clean.slice(-1);
  return rutCheckDigit(body) === dv;
}

// ── Phone helpers ─────────────────────────────────────────────────────────────

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.startsWith("56")) {
    // +56 9 XXXX XXXX
    const local = d.slice(2);
    if (local.length <= 1) return `+56 ${local}`;
    if (local.length <= 5) return `+56 ${local[0]} ${local.slice(1)}`;
    return `+56 ${local[0]} ${local.slice(1, 5)} ${local.slice(5)}`;
  }
  if (d.length <= 1) return d;
  if (d.length <= 5) return `${d[0]} ${d.slice(1)}`;
  return `${d[0]} ${d.slice(1, 5)} ${d.slice(5, 9)}`;
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
      mask = "rut",
      pattern,
      showValidation = true,
      size,
      className,
      disabled,
      placeholder,
      ...props
    },
    ref
  ) => {
    const isRutValid = mask === "rut" && value.replace(/\D/g, "").length >= 7
      ? validateRut(value)
      : null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      let formatted = raw;

      if (mask === "rut") formatted = formatRut(raw);
      else if (mask === "phone") formatted = formatPhone(raw);
      else if (mask === "bank-account") formatted = formatBankAccount(raw);
      else if (mask === "custom" && pattern) formatted = applyCustomMask(raw, pattern);

      const rawDigits = formatted.replace(/[^0-9kK]/g, "");
      onChange?.(formatted, rawDigits);
    };

    const defaultPlaceholder = {
      rut: "12.345.678-9",
      phone: "+56 9 1234 5678",
      "bank-account": "0000 0000 0000 0000",
      custom: pattern ?? "",
    }[mask];

    const validationClass =
      mask === "rut" && showValidation && isRutValid !== null
        ? isRutValid
          ? "border-success focus-visible:border-success focus-visible:ring-success/30"
          : "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30 aria-invalid:ring-0"
        : "";

    return (
      <input
        {...props}
        ref={ref}
        type="text"
        inputMode={mask === "rut" || mask === "bank-account" ? "numeric" : "tel"}
        value={value}
        disabled={disabled}
        placeholder={placeholder ?? defaultPlaceholder}
        onChange={handleChange}
        className={cn(inputVariants({ size, className }), validationClass)}
      />
    );
  }
);
MaskedInput.displayName = "MaskedInput";
