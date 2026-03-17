import * as React from "react";
import { Button, type ButtonProps } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Download, ChevronRight, Search, Settings, MoreHorizontal, Pencil,
  Check, Save, ArrowRight,
  AlertTriangle, Trash2, XCircle, Ban, ShieldAlert,
  Info, HelpCircle, Eye,
  Loader2, Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type BtnVariant = NonNullable<ButtonProps["variant"]>;
type BtnSize    = NonNullable<ButtonProps["size"]>;
type BtnShape   = NonNullable<ButtonProps["shape"]>;

interface VariantRow {
  variant:   BtnVariant;
  label:     string;
  group:     string;
  iconLeft:  LucideIcon;
  iconRight: LucideIcon;
  iconOnly:  LucideIcon | null;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_ROWS: VariantRow[] = [
  { variant: "default",             label: "Primary",   group: "Base",                  iconLeft: Download,       iconRight: ChevronRight, iconOnly: Search        },
  { variant: "secondary",           label: "Secondary", group: "Base",                  iconLeft: Settings,       iconRight: ChevronRight, iconOnly: Settings      },
  { variant: "outline",             label: "Outline",   group: "Base",                  iconLeft: Pencil,         iconRight: ChevronRight, iconOnly: Pencil        },
  { variant: "ghost",               label: "Ghost",     group: "Base",                  iconLeft: MoreHorizontal, iconRight: ChevronRight, iconOnly: MoreHorizontal},
  { variant: "link",                label: "Link",      group: "Base",                  iconLeft: ArrowRight,     iconRight: ArrowRight,   iconOnly: null          },
  { variant: "success",             label: "Approve",   group: "Semantic · Success",    iconLeft: Check,          iconRight: ChevronRight, iconOnly: Check         },
  { variant: "success-outline",     label: "Approve",   group: "Semantic · Success",    iconLeft: Check,          iconRight: ChevronRight, iconOnly: Check         },
  { variant: "success-ghost",       label: "Save",      group: "Semantic · Success",    iconLeft: Save,           iconRight: ChevronRight, iconOnly: Save          },
  { variant: "destructive",         label: "Delete",    group: "Semantic · Destructive",iconLeft: Trash2,         iconRight: XCircle,      iconOnly: Trash2        },
  { variant: "destructive-outline", label: "Reject",    group: "Semantic · Destructive",iconLeft: XCircle,        iconRight: XCircle,      iconOnly: XCircle       },
  { variant: "destructive-ghost",   label: "Cancel",    group: "Semantic · Destructive",iconLeft: Ban,            iconRight: XCircle,      iconOnly: Ban           },
  { variant: "warning",             label: "Warning",   group: "Semantic · Warning",    iconLeft: AlertTriangle,  iconRight: ChevronRight, iconOnly: AlertTriangle },
  { variant: "warning-outline",     label: "Pause",     group: "Semantic · Warning",    iconLeft: Clock,          iconRight: ChevronRight, iconOnly: Clock         },
  { variant: "warning-ghost",       label: "Review",    group: "Semantic · Warning",    iconLeft: ShieldAlert,    iconRight: ChevronRight, iconOnly: ShieldAlert   },
  { variant: "info",                label: "Info",      group: "Semantic · Info",       iconLeft: Info,           iconRight: ChevronRight, iconOnly: Info          },
  { variant: "info-outline",        label: "Detail",    group: "Semantic · Info",       iconLeft: Eye,            iconRight: ChevronRight, iconOnly: Eye           },
  { variant: "info-ghost",          label: "Help",      group: "Semantic · Info",       iconLeft: HelpCircle,     iconRight: ChevronRight, iconOnly: HelpCircle    },
];

const SIZE_VARIANTS: BtnVariant[]  = ["default","secondary","outline","ghost","success","destructive","warning","info"];
const PILL_VARIANTS: BtnVariant[]  = ["default","secondary","outline","ghost","success","success-outline","destructive","destructive-outline","warning","info"];
const ICON_VARIANTS: BtnVariant[]  = ["default","secondary","outline","ghost","success","success-outline","success-ghost","destructive","destructive-outline","destructive-ghost","warning","warning-outline","warning-ghost","info","info-outline","info-ghost"];

// ─── Flat-row builder — avoids React.Fragment inside <tbody> ──────────────────
// Figma Make's inspector injects data-* props onto Fragment which React rejects.
// Solution: pre-build a flat array that includes group-header sentinel objects.

type FlatItem<T> =
  | { kind: "group"; label: string; colSpan: number; key: string }
  | { kind: "row";   data: T; key: string };

function flattenWithGroups<T extends { group: string; variant: string }>(
  items: T[],
  colSpan: number,
): FlatItem<T>[] {
  const out: FlatItem<T>[] = [];
  items.forEach((item, i) => {
    if (i === 0 || item.group !== items[i - 1].group) {
      out.push({ kind: "group", label: item.group, colSpan, key: `grp-${item.group}` });
    }
    out.push({ kind: "row", data: item, key: item.variant });
  });
  return out;
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function Canvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-x-auto">
      {children}
    </div>
  );
}

function Section({ id, title, description, meta, children }: {
  id: string; title: string; description?: string; meta?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-3 scroll-mt-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-foreground">{title}</h3>
          {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
        </div>
        {meta && <span className="shrink-0 text-[11px] text-muted-foreground/50 mt-1 font-mono">{meta}</span>}
      </div>
      {children}
    </section>
  );
}

function GroupHeaderRow({ label, colSpan }: { label: string; colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="bg-muted px-4 pt-4 pb-1.5">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground select-none">
          {label}
        </span>
      </td>
    </tr>
  );
}

function THead({ cols }: { cols: Array<{ label: string; sub?: string }> }) {
  return (
    <thead>
      <tr className="border-b border-border bg-muted">
        <th className="w-[152px] min-w-[152px] py-2 px-4 text-left">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Variant</span>
        </th>
        {cols.map((c, i) => (
          <th key={i} className="px-4 py-2 text-center min-w-[128px]">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">{c.label}</span>
            {c.sub && <span className="text-[9px] text-muted-foreground block mt-0.5">{c.sub}</span>}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function RowLabel({ label, code }: { label: string; code: string }) {
  return (
    <td className="pl-4 pr-5 py-3 align-middle whitespace-nowrap sticky left-0 z-10 bg-card border-r border-border">
      <span className="text-xs text-foreground block">{label}</span>
      <code className="text-[10px] text-muted-foreground">{code}</code>
    </td>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-3 align-middle text-center">
      <div className="flex items-center justify-center">{children}</div>
    </td>
  );
}

function Dash() {
  return <span className="text-muted-foreground/25 select-none text-sm">—</span>;
}

// ─── Section 1: Variants × States matrix ─────────────────────────────────────

function VariantMatrix() {
  const COLS = [
    { label: "No icon" },
    { label: "Icon left" },
    { label: "Icon right" },
    { label: "Icon only",  sub: "size=icon · 36px" },
    { label: "Loading",    sub: "disabled" },
    { label: "Disabled" },
  ];
  const flat = flattenWithGroups(ALL_ROWS, COLS.length + 1);

  return (
    <Canvas>
      <table className="w-full border-collapse">
        <THead cols={COLS} />
        <tbody>
          {flat.map((item) => {
            if (item.kind === "group") {
              return <GroupHeaderRow key={item.key} label={item.label} colSpan={item.colSpan} />;
            }
            const r = item.data;
            const IL = r.iconLeft;
            const IR = r.iconRight;
            const IO = r.iconOnly;
            return (
              <tr key={item.key} className="border-t border-border hover:bg-muted transition-colors">
                <RowLabel label={r.label} code={r.variant} />
                <Cell><Button variant={r.variant}>{r.label}</Button></Cell>
                <Cell><Button variant={r.variant}><IL />{r.label}</Button></Cell>
                <Cell><Button variant={r.variant}>{r.label}<IR /></Button></Cell>
                <Cell>
                  {IO ? <Button variant={r.variant} size="icon"><IO /></Button> : <Dash />}
                </Cell>
                <Cell>
                  <Button variant={r.variant} disabled><Loader2 className="animate-spin" />{r.label}</Button>
                </Cell>
                <Cell><Button variant={r.variant} disabled>{r.label}</Button></Cell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Canvas>
  );
}

// ─── Section 2: Sizes ─────────────────────────────────────────────────────────

function SizesGrid() {
  const TEXT_SIZES: Array<{ size: BtnSize; label: string; sub: string }> = [
    { size: "sm",      label: "sm",      sub: "h-8" },
    { size: "default", label: "md",      sub: "h-9" },
    { size: "lg",      label: "lg",      sub: "h-10" },
  ];
  const ICON_SIZES: Array<{ size: BtnSize; label: string; sub: string }> = [
    { size: "icon-sm", label: "icon-sm", sub: "28px □" },
    { size: "icon",    label: "icon",    sub: "36px □" },
    { size: "icon-lg", label: "icon-lg", sub: "44px □" },
  ];
  const allCols = [...TEXT_SIZES, ...ICON_SIZES];

  return (
    <Canvas>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted">
            <th className="w-[152px] min-w-[152px] py-2 px-4 text-left">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Variant</span>
            </th>
            {/* text sizes header group */}
            {TEXT_SIZES.map(c => (
              <th key={c.size} className="px-4 py-2 text-center min-w-[110px]">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">{c.label}</span>
                <span className="text-[9px] text-muted-foreground block">{c.sub}</span>
              </th>
            ))}
            {/* divider col */}
            <th className="w-px bg-border" />
            {/* icon sizes header group */}
            {ICON_SIZES.map(c => (
              <th key={c.size} className="px-4 py-2 text-center min-w-[100px]">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">{c.label}</span>
                <span className="text-[9px] text-muted-foreground block">{c.sub}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SIZE_VARIANTS.map((variant) => {
            const row = ALL_ROWS.find(r => r.variant === variant)!;
            const IO = row?.iconOnly;
            return (
              <tr key={variant} className="border-t border-border hover:bg-muted transition-colors">
                <RowLabel label={row.label} code={variant} />
                {TEXT_SIZES.map(c => (
                  <Cell key={c.size}><Button variant={variant} size={c.size}>{row.label}</Button></Cell>
                ))}
                <td className="w-px bg-border" />
                {ICON_SIZES.map(c => (
                  <Cell key={c.size}>
                    {IO ? <Button variant={variant} size={c.size}><IO /></Button> : <Dash />}
                  </Cell>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Canvas>
  );
}

// ─── Section 3: Shape — Pill ──────────────────────────────────────────────────

function PillGrid() {
  const COLS = [
    { label: "No icon" },
    { label: "Icon left" },
    { label: "Icon right" },
    { label: "Icon only ○", sub: "size=icon" },
  ];
  const pillRows = PILL_VARIANTS.map(v => ALL_ROWS.find(r => r.variant === v)!).filter(Boolean);
  const flat     = flattenWithGroups(pillRows, COLS.length + 1);

  return (
    <Canvas>
      <table className="w-full border-collapse">
        <THead cols={COLS} />
        <tbody>
          {flat.map((item) => {
            if (item.kind === "group") {
              return <GroupHeaderRow key={item.key} label={item.label} colSpan={item.colSpan} />;
            }
            const r = item.data;
            const IL = r.iconLeft;
            const IR = r.iconRight;
            const IO = r.iconOnly;
            return (
              <tr key={item.key} className="border-t border-border hover:bg-muted transition-colors">
                <RowLabel label={r.label} code={r.variant} />
                <Cell><Button variant={r.variant} shape="pill">{r.label}</Button></Cell>
                <Cell><Button variant={r.variant} shape="pill"><IL />{r.label}</Button></Cell>
                <Cell><Button variant={r.variant} shape="pill">{r.label}<IR /></Button></Cell>
                <Cell>
                  {IO ? <Button variant={r.variant} size="icon" shape="pill"><IO /></Button> : <Dash />}
                </Cell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Canvas>
  );
}

// ─── Section 4 & 5: Icon buttons ─────────────────────────────────────────────

function IconButtonsGrid({ shape }: { shape: BtnShape }) {
  const COLS: Array<{ size: BtnSize; label: string; sub: string }> = [
    { size: "icon-sm", label: "icon-sm", sub: "28px" },
    { size: "icon",    label: "icon",    sub: "36px" },
    { size: "icon-lg", label: "icon-lg", sub: "44px" },
  ];
  const iconRows = ICON_VARIANTS.map(v => ALL_ROWS.find(r => r.variant === v)!).filter(Boolean);
  const flat     = flattenWithGroups(iconRows, COLS.length + 1);

  return (
    <Canvas>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted">
            <th className="w-[152px] min-w-[152px] py-2 px-4 text-left">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Variant</span>
            </th>
            {COLS.map(c => (
              <th key={c.size} className="px-4 py-2 text-center min-w-[100px]">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">{c.label}</span>
                <span className="text-[9px] text-muted-foreground block">{c.sub}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {flat.map((item) => {
            if (item.kind === "group") {
              return <GroupHeaderRow key={item.key} label={item.label} colSpan={COLS.length + 1} />;
            }
            const r  = item.data;
            const IC = r.iconOnly ?? r.iconLeft;
            return (
              <tr key={item.key} className="border-t border-border hover:bg-muted transition-colors">
                <RowLabel label={r.label} code={r.variant} />
                {COLS.map(c => (
                  <Cell key={c.size}>
                    <Button variant={r.variant} size={c.size} shape={shape}><IC /></Button>
                  </Cell>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Canvas>
  );
}

// ─── Section 6: Props ─────────────────────────────────────────────────────────

const PROPS_DATA = [
  { name: "variant",  type: '"default"|"secondary"|"outline"|"ghost"|"link"|"success"|"warning"|"info"|"destructive"|"*-outline"|"*-ghost"', default: '"default"', desc: "Visual style. Semantic variants use explicit color tokens compatible with light/dark." },
  { name: "size",     type: '"sm"|"default"|"lg"|"icon-sm"|"icon"|"icon-lg"',                                                              default: '"default"', desc: "Height scale. icon-* produce square icon-only buttons (28 / 36 / 44 px)." },
  { name: "shape",    type: '"default"|"pill"',                                                                                             default: '"default"', desc: "Border radius: rounded-md (10 px) or rounded-full (pill). Applies to all variants." },
  { name: "disabled", type: "boolean",                                                                                                      default: "false",     desc: "Disabled state. Combine with Loader2 animate-spin as first child for loading." },
  { name: "asChild",  type: "boolean",                                                                                                      default: "false",     desc: "Merges props onto its direct child via Radix Slot (Link, anchor, etc.)." },
];

function PropsTable() {
  return (
    <Canvas>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted">
            {["Prop", "Type", "Default", "Description"].map(h => (
              <th key={h} className="px-4 py-2 text-left">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{h}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PROPS_DATA.map(p => (
            <tr key={p.name} className="border-t border-border hover:bg-muted transition-colors">
              <td className="px-4 py-3 align-top whitespace-nowrap">
                <code className="text-xs bg-muted border border-border px-1.5 py-0.5 rounded text-foreground">
                  {p.name}
                </code>
              </td>
              <td className="px-4 py-3 align-top max-w-[260px]">
                <code className="text-xs text-muted-foreground break-words">{p.type}</code>
              </td>
              <td className="px-4 py-3 align-top whitespace-nowrap">
                <code className="text-xs bg-muted border border-border px-1.5 py-0.5 rounded text-muted-foreground">
                  {p.default}
                </code>
              </td>
              <td className="px-4 py-3 align-top text-sm text-muted-foreground">{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Canvas>
  );
}

// ─── Quick nav ────────────────────────────────────────────────────────────────

const NAV = [
  { id: "s-variants", label: "Variants & States" },
  { id: "s-sizes",    label: "Sizes" },
  { id: "s-pill",     label: "Pill Shape" },
  { id: "s-icon-sq",  label: "Icon Buttons · Square" },
  { id: "s-icon-rd",  label: "Icon Buttons · Round" },
  { id: "s-props",    label: "Props" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ButtonPage() {
  return (
    <div className="space-y-12 pb-16">

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral-soft-outline">Actions</Badge>
          <Badge variant="secondary-soft-outline">DSM v1.0</Badge>
          <Badge variant="info-soft-outline">Atom</Badge>
        </div>
        <div>
          <h2 className="text-foreground">Button</h2>
          <p className="text-muted-foreground mt-1">
            Interactive trigger for actions and commands. 17 variants across 5 semantic families, 3 text sizes,
            3 icon sizes, 2 shapes, and all standard interaction states (default · loading · disabled).
          </p>
        </div>
        {/* Quick nav */}
        <div className="flex flex-wrap gap-1.5">
          {NAV.map(n => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="inline-flex items-center rounded-md border border-border bg-card hover:bg-muted px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {n.label}
            </a>
          ))}
        </div>
        <Separator />
      </div>

      {/* S1 */}
      <Section
        id="s-variants"
        title="Variants & States"
        description="17 variants × 6 property/state columns. Rows grouped by semantic family."
        meta="size=default · shape=default"
      >
        <VariantMatrix />
      </Section>

      {/* S2 */}
      <Section
        id="s-sizes"
        title="Sizes"
        description="Text sizes (sm / md / lg) + icon-only sizes (icon-sm / icon / icon-lg) for key variants."
        meta="shape=default"
      >
        <SizesGrid />
      </Section>

      {/* S3 */}
      <Section
        id="s-pill"
        title="Pill Shape"
        description="shape=pill applies rounded-full. Combinable with any variant and size."
        meta="shape=pill · size=default"
      >
        <PillGrid />
      </Section>

      {/* S4 */}
      <Section
        id="s-icon-sq"
        title="Icon Buttons — Square"
        description="Icon-only buttons, square corners. Three sizes: icon-sm (28 px) · icon (36 px) · icon-lg (44 px)."
        meta="shape=default"
      >
        <IconButtonsGrid shape="default" />
      </Section>

      {/* S5 */}
      <Section
        id="s-icon-rd"
        title="Icon Buttons — Round"
        description="Icon-only buttons, pill shape. Same size scale as square variant."
        meta="shape=pill"
      >
        <IconButtonsGrid shape="pill" />
      </Section>

      {/* S6 */}
      <Section
        id="s-props"
        title="Props"
        description="Complete API reference."
      >
        <PropsTable />
      </Section>

    </div>
  );
}