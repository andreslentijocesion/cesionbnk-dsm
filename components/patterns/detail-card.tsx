import * as React from "react";
import { Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";

export interface DetailField {
  label: string;
  value: React.ReactNode;
  span?: 1 | 2 | 3;
  copyable?: boolean;
  copyValue?: string;
  hidden?: boolean;
}

export interface DetailCardProps {
  title?: string;
  fields: DetailField[];
  columns?: 2 | 3 | 4;
  actions?: React.ReactNode;
  className?: string;
  variant?: "default" | "compact";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      onClick={copy}
      className="ml-1.5 text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
      title="Copiar"
    >
      {copied ? <Check size={12} className="text-success-on-subtle" /> : <Copy size={12} />}
    </button>
  );
}

const colClasses: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const spanClasses: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
};

export function DetailCard({
  title,
  fields,
  columns = 2,
  actions,
  className,
  variant = "default",
}: DetailCardProps) {
  const visible = fields.filter((f) => !f.hidden);
  const padding = variant === "compact" ? "p-4" : "p-6";
  const gap = variant === "compact" ? "gap-3" : "gap-4";

  return (
    <Card className={cn("", className)}>
      {(title || actions) && (
        <CardHeader className={cn("flex flex-row items-center justify-between pb-3", padding, "pt-4 px-4")}>
          {title && <CardTitle className="text-sm font-semibold">{title}</CardTitle>}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </CardHeader>
      )}
      <CardContent className={cn(padding, title || actions ? "pt-0" : "")}>
        <div className={cn("grid", colClasses[columns], gap)}>
          {visible.map((field, i) => {
            const span = Math.min(field.span ?? 1, columns);
            const copyText = field.copyable
              ? (field.copyValue ?? (typeof field.value === "string" ? field.value : ""))
              : null;

            return (
              <div
                key={i}
                className={cn("min-w-0", spanClasses[span])}
              >
                <p className="text-xs text-muted-foreground mb-0.5 truncate">{field.label}</p>
                <div className="group flex items-center gap-0 min-w-0">
                  <div className={cn(
                    "text-sm font-medium truncate",
                    typeof field.value === "string" && "text-foreground",
                  )}>
                    {field.value}
                  </div>
                  {copyText && <CopyButton text={copyText} />}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Convenience: DetailSection (no card shell, just the grid) ───
export interface DetailSectionProps {
  fields: DetailField[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function DetailSection({ fields, columns = 2, className }: DetailSectionProps) {
  const visible = fields.filter((f) => !f.hidden);
  const gap = "gap-3";

  return (
    <div className={cn("grid", colClasses[columns], gap, className)}>
      {visible.map((field, i) => {
        const span = Math.min(field.span ?? 1, columns);
        const copyText = field.copyable
          ? (field.copyValue ?? (typeof field.value === "string" ? field.value : ""))
          : null;

        return (
          <div key={i} className={cn("min-w-0", spanClasses[span])}>
            <p className="text-xs text-muted-foreground mb-0.5">{field.label}</p>
            <div className="group flex items-center min-w-0">
              <span className="text-sm font-medium truncate">{field.value}</span>
              {copyText && <CopyButton text={copyText} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
