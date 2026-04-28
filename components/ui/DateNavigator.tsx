/**
 * DateNavigator — Period selector for dashboard filtering
 * Presets: Hoy, Esta semana, Este mes, Este trimestre, Este año
 * Returns { from, to, preset } on change.
 * @layer atoms
 */
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { cn } from "./utils";

export type DatePreset = "today" | "week" | "month" | "quarter" | "year" | "custom";

export interface DateRange {
  from: Date;
  to: Date;
  preset: DatePreset;
  label: string;
}

export interface DateNavigatorProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  /** Available presets to show */
  presets?: DatePreset[];
  /** Show prev/next navigation arrows */
  showNavigation?: boolean;
  className?: string;
}

const PRESET_LABELS: Record<DatePreset, string> = {
  today:   "Hoy",
  week:    "Semana",
  month:   "Mes",
  quarter: "Trimestre",
  year:    "Año",
  custom:  "Personalizado",
};

function getRange(preset: DatePreset, ref = new Date()): DateRange {
  const d = new Date(ref);
  d.setHours(0, 0, 0, 0);

  let from: Date, to: Date;

  switch (preset) {
    case "today":
      from = new Date(d); to = new Date(d); break;
    case "week": {
      const dow = d.getDay(); // 0=Sun
      from = new Date(d); from.setDate(d.getDate() - dow + (dow === 0 ? -6 : 1));
      to   = new Date(from); to.setDate(from.getDate() + 6);
      break;
    }
    case "month":
      from = new Date(d.getFullYear(), d.getMonth(), 1);
      to   = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      break;
    case "quarter": {
      const q = Math.floor(d.getMonth() / 3);
      from = new Date(d.getFullYear(), q * 3, 1);
      to   = new Date(d.getFullYear(), q * 3 + 3, 0);
      break;
    }
    case "year":
      from = new Date(d.getFullYear(), 0, 1);
      to   = new Date(d.getFullYear(), 11, 31);
      break;
    default:
      from = new Date(d); to = new Date(d);
  }

  return { from, to, preset, label: formatLabel(preset, from, to) };
}

function navigate(range: DateRange, direction: -1 | 1): DateRange {
  const { preset, from } = range;
  const ref = new Date(from);

  switch (preset) {
    case "today":   ref.setDate(ref.getDate() + direction); break;
    case "week":    ref.setDate(ref.getDate() + direction * 7); break;
    case "month":   ref.setMonth(ref.getMonth() + direction); break;
    case "quarter": ref.setMonth(ref.getMonth() + direction * 3); break;
    case "year":    ref.setFullYear(ref.getFullYear() + direction); break;
    default: return range;
  }

  return getRange(preset, ref);
}

function formatLabel(preset: DatePreset, from: Date, to: Date): string {
  const fmtShort = (d: Date) =>
    d.toLocaleDateString("es-CO", { day: "numeric", month: "short" });
  const fmtMonth = (d: Date) =>
    d.toLocaleDateString("es-CO", { month: "long", year: "numeric" });

  switch (preset) {
    case "today":   return from.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
    case "week":    return `${fmtShort(from)} – ${fmtShort(to)}`;
    case "month":   return fmtMonth(from);
    case "quarter": {
      const q = Math.floor(from.getMonth() / 3) + 1;
      return `Q${q} ${from.getFullYear()}`;
    }
    case "year":    return String(from.getFullYear());
    default:        return `${fmtShort(from)} – ${fmtShort(to)}`;
  }
}

const DEFAULT_PRESETS: DatePreset[] = ["today", "week", "month", "quarter", "year"];

export function DateNavigator({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  showNavigation = true,
  className,
}: DateNavigatorProps) {
  const [internal, setInternal] = React.useState<DateRange>(() => getRange("month"));
  const current = value ?? internal;

  const set = (range: DateRange) => {
    setInternal(range);
    onChange?.(range);
  };

  return (
    <div className={cn("flex items-center gap-1 flex-wrap", className)}>
      {/* Preset tabs */}
      <div className="flex items-center rounded-lg border border-border bg-muted p-0.5 gap-0.5">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => set(getRange(p))}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap",
              current.preset === p
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {PRESET_LABELS[p]}
          </button>
        ))}
      </div>

      {/* Navigation + label */}
      {showNavigation && current.preset !== "custom" && (
        <div className="flex items-center gap-1">
          <Button
            variant="outline" size="icon" className="size-7"
            onClick={() => set(navigate(current, -1))}
          >
            <ChevronLeft className="size-3.5 .5" />
          </Button>
          <span className="text-xs font-medium text-foreground min-w-[120px] text-center px-1 whitespace-nowrap">
            {current.label}
          </span>
          <Button
            variant="outline" size="icon" className="size-7"
            onClick={() => set(navigate(current, 1))}
          >
            <ChevronRight className="size-3.5 .5" />
          </Button>
        </div>
      )}
    </div>
  );
}

export { getRange, PRESET_LABELS };
