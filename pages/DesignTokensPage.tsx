/**
 * DesignTokensPage
 * ─────────────────
 * Token Reference — Single source of truth visual.
 * Displays every CSS custom property with its LIVE rendered value,
 * CSS var name, Tailwind class. Values update dynamically when the
 * color mode changes.
 *
 * Sections: Colors · Typography · Shape · Shadows · Animations · Utilities
 *
 * @version 3.0.0 — Single tenant (CESIONBNK): reads live computed values via getComputedStyle
 */
import { useTheme } from "../components/providers/ThemeProvider";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Copy, Check, Sun, Moon, Palette, Monitor } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Separator } from "../components/ui/Separator";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { CssVarBox, FontFamilyText, HexButton, RadiusBox, ShadowBox } from "../components/ui/DynamicPreviews";
import { copyToClipboard } from "../lib/utils";

// ─────────────────────────────────────────────
// COPY HELPER
// ─────────────────────────────────────────────
function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string) => {
    copyToClipboard(text).then(() => {
      setCopied(text);
      toast.success("Copied!", { description: text, duration: 1500 });
      setTimeout(() => setCopied(null), 1500);
    });
  };
  return { copy, copied };
}

// ─────────────────────────────────────────────
// LIVE TOKEN READER
// ─────────────────────────────────────────────
/**
 * Reads all CSS custom properties from :root at runtime.
 * Re-reads whenever colorMode changes.
 */
function useLiveTokens(cssVars: string[]) {
  const { colorMode } = useTheme();
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    // Small delay to let CSS cascade settle after mode switch
    const raf = requestAnimationFrame(() => {
      const computed = getComputedStyle(document.documentElement);
      const result: Record<string, string> = {};
      for (const v of cssVars) {
        result[v] = computed.getPropertyValue(v).trim();
      }
      setValues(result);
    });
    return () => cancelAnimationFrame(raf);
  }, [colorMode, cssVars.join(",")]);

  return values;
}

/**
 * Attempts to normalize a CSS color value to hex.
 * Falls back to the raw string if conversion isn't possible.
 */
function toHex(raw: string): string {
  if (!raw) return "";
  // Already hex
  if (raw.startsWith("#")) return raw;
  // oklch / rgb — try canvas conversion
  try {
    const ctx = document.createElement("canvas").getContext("2d");
    if (ctx) {
      ctx.fillStyle = raw;
      const result = ctx.fillStyle;
      if (result.startsWith("#")) return result;
    }
  } catch {
    // ignore
  }
  return raw;
}

// ─────────────────────────────────────────────
// FONT HELPER
// ─────────────────────────────────────────────
// CESIONBNK font info
const FONT_INFO = { name: "Gotham", source: "jsDelivr CDN", weights: "300–700" };

// ─────────────────────────────────────────────
// TOKEN DATA
// ─────────────────────────────────────────────
interface ColorToken {
  name: string;
  cssVar: string;
  twBg?: string;
  twText?: string;
  twBorder?: string;
  fgVar?: string; // optional foreground CSS var for "Aa" preview
}

interface ColorGroup {
  title: string;
  description: string;
  tokens: ColorToken[];
}

const colorGroups: ColorGroup[] = [
  {
    title: "Brand",
    description: "Core identity colors.",
    tokens: [
      { name: "primary", cssVar: "--primary", twBg: "bg-primary", twText: "text-primary", fgVar: "--primary-foreground" },
      { name: "primary-foreground", cssVar: "--primary-foreground", twText: "text-primary-foreground" },
      { name: "secondary", cssVar: "--secondary", twBg: "bg-secondary", twText: "text-secondary", fgVar: "--secondary-foreground" },
      { name: "secondary-foreground", cssVar: "--secondary-foreground", twText: "text-secondary-foreground" },
    ],
  },
  {
    title: "Surfaces",
    description: "Background and card surfaces for page and component layers.",
    tokens: [
      { name: "background", cssVar: "--background", twBg: "bg-background" },
      { name: "foreground", cssVar: "--foreground", twText: "text-foreground" },
      { name: "card", cssVar: "--card", twBg: "bg-card", fgVar: "--card-foreground" },
      { name: "card-foreground", cssVar: "--card-foreground", twText: "text-card-foreground" },
      { name: "popover", cssVar: "--popover", twBg: "bg-popover", fgVar: "--popover-foreground" },
      { name: "popover-foreground", cssVar: "--popover-foreground", twText: "text-popover-foreground" },
      { name: "muted", cssVar: "--muted", twBg: "bg-muted", fgVar: "--muted-foreground" },
      { name: "muted-foreground", cssVar: "--muted-foreground", twText: "text-muted-foreground" },
      { name: "accent", cssVar: "--accent", twBg: "bg-accent", fgVar: "--accent-foreground" },
      { name: "accent-foreground", cssVar: "--accent-foreground", twText: "text-accent-foreground" },
    ],
  },
  {
    title: "Semantic",
    description: "Status and feedback signals — destructive, success, warning, info.",
    tokens: [
      { name: "destructive", cssVar: "--destructive", twBg: "bg-destructive", fgVar: "--destructive-foreground" },
      { name: "destructive-foreground", cssVar: "--destructive-foreground", twText: "text-destructive-foreground" },
      { name: "success", cssVar: "--success", twBg: "bg-success", fgVar: "--success-foreground" },
      { name: "success-foreground", cssVar: "--success-foreground", twText: "text-success-foreground" },
      { name: "warning", cssVar: "--warning", twBg: "bg-warning", fgVar: "--warning-foreground" },
      { name: "warning-foreground", cssVar: "--warning-foreground", twText: "text-warning-foreground" },
      { name: "info", cssVar: "--info", twBg: "bg-info", fgVar: "--info-foreground" },
      { name: "info-foreground", cssVar: "--info-foreground", twText: "text-info-foreground" },
    ],
  },
  {
    title: "Forms",
    description: "Input, border and ring colors for form controls.",
    tokens: [
      { name: "border", cssVar: "--border", twBorder: "border-border" },
      { name: "input", cssVar: "--input", twBorder: "border-input" },
      { name: "input-background", cssVar: "--input-background", twBg: "bg-input-background" },
      { name: "switch-background", cssVar: "--switch-background", twBg: "bg-switch-background" },
      { name: "ring", cssVar: "--ring" },
    ],
  },
  {
    title: "Sidebar",
    description: "Navigation sidebar layer tokens.",
    tokens: [
      { name: "sidebar", cssVar: "--sidebar", twBg: "bg-sidebar", fgVar: "--sidebar-foreground" },
      { name: "sidebar-foreground", cssVar: "--sidebar-foreground", twText: "text-sidebar-foreground" },
      { name: "sidebar-primary", cssVar: "--sidebar-primary", twBg: "bg-sidebar-primary", fgVar: "--sidebar-primary-foreground" },
      { name: "sidebar-primary-foreground", cssVar: "--sidebar-primary-foreground", twText: "text-sidebar-primary-foreground" },
      { name: "sidebar-accent", cssVar: "--sidebar-accent", twBg: "bg-sidebar-accent", fgVar: "--sidebar-accent-foreground" },
      { name: "sidebar-accent-foreground", cssVar: "--sidebar-accent-foreground", twText: "text-sidebar-accent-foreground" },
      { name: "sidebar-border", cssVar: "--sidebar-border", twBorder: "border-sidebar-border" },
      { name: "sidebar-ring", cssVar: "--sidebar-ring" },
    ],
  },
  {
    title: "Charts",
    description: "5-stop data visualization palette. Adapts between light and dark mode.",
    tokens: [
      { name: "chart-1", cssVar: "--chart-1", twBg: "bg-chart-1" },
      { name: "chart-2", cssVar: "--chart-2", twBg: "bg-chart-2" },
      { name: "chart-3", cssVar: "--chart-3", twBg: "bg-chart-3" },
      { name: "chart-4", cssVar: "--chart-4", twBg: "bg-chart-4" },
      { name: "chart-5", cssVar: "--chart-5", twBg: "bg-chart-5" },
    ],
  },
];

// Collect all CSS vars for the live reader
const ALL_COLOR_VARS = colorGroups.flatMap((g) =>
  g.tokens.flatMap((t) => [t.cssVar, ...(t.fgVar ? [t.fgVar] : [])])
);

// KPI colors (CSS vars)
interface KpiToken { name: string; cssVar: string; darkVar: string; bgVar: string; }
const kpiTokens: KpiToken[] = [
  { name: "kpi-yellow", cssVar: "--kpi-yellow", darkVar: "--kpi-yellow-dark", bgVar: "--kpi-yellow-bg" },
  { name: "kpi-orange", cssVar: "--kpi-orange", darkVar: "--kpi-orange-dark", bgVar: "--kpi-orange-bg" },
  { name: "kpi-blue", cssVar: "--kpi-blue", darkVar: "--kpi-blue-dark", bgVar: "--kpi-blue-bg" },
  { name: "kpi-lime", cssVar: "--kpi-lime", darkVar: "--kpi-lime-dark", bgVar: "--kpi-lime-bg" },
];

const KPI_VARS = kpiTokens.flatMap((t) => [t.cssVar, t.darkVar, t.bgVar]);

// Tailwind base color palette (reference)
interface TwColorScale {
  name: string;
  shades: { step: number; hex: string }[];
}

const tailwindPalette: TwColorScale[] = [
  { name: "slate", shades: [{ step: 50, hex: "#f8fafc" }, { step: 100, hex: "#f1f5f9" }, { step: 200, hex: "#e2e8f0" }, { step: 300, hex: "#cbd5e1" }, { step: 400, hex: "#94a3b8" }, { step: 500, hex: "#64748b" }, { step: 600, hex: "#475569" }, { step: 700, hex: "#334155" }, { step: 800, hex: "#1e293b" }, { step: 900, hex: "#0f172a" }, { step: 950, hex: "#020617" }] },
  { name: "gray", shades: [{ step: 50, hex: "#f9fafb" }, { step: 100, hex: "#f3f4f6" }, { step: 200, hex: "#e5e7eb" }, { step: 300, hex: "#d1d5db" }, { step: 400, hex: "#9ca3af" }, { step: 500, hex: "#6b7280" }, { step: 600, hex: "#4b5563" }, { step: 700, hex: "#374151" }, { step: 800, hex: "#1f2937" }, { step: 900, hex: "#111827" }, { step: 950, hex: "#030712" }] },
  { name: "zinc", shades: [{ step: 50, hex: "#fafafa" }, { step: 100, hex: "#f4f4f5" }, { step: 200, hex: "#e4e4e7" }, { step: 300, hex: "#d4d4d8" }, { step: 400, hex: "#a1a1aa" }, { step: 500, hex: "#71717a" }, { step: 600, hex: "#52525b" }, { step: 700, hex: "#3f3f46" }, { step: 800, hex: "#27272a" }, { step: 900, hex: "#18181b" }, { step: 950, hex: "#09090b" }] },
  { name: "neutral", shades: [{ step: 50, hex: "#fafafa" }, { step: 100, hex: "#f5f5f5" }, { step: 200, hex: "#e5e5e5" }, { step: 300, hex: "#d4d4d4" }, { step: 400, hex: "#a3a3a3" }, { step: 500, hex: "#737373" }, { step: 600, hex: "#525252" }, { step: 700, hex: "#404040" }, { step: 800, hex: "#262626" }, { step: 900, hex: "#171717" }, { step: 950, hex: "#0a0a0a" }] },
  { name: "stone", shades: [{ step: 50, hex: "#fafaf9" }, { step: 100, hex: "#f5f5f4" }, { step: 200, hex: "#e7e5e4" }, { step: 300, hex: "#d6d3d1" }, { step: 400, hex: "#a8a29e" }, { step: 500, hex: "#78716c" }, { step: 600, hex: "#57534e" }, { step: 700, hex: "#44403c" }, { step: 800, hex: "#292524" }, { step: 900, hex: "#1c1917" }, { step: 950, hex: "#0c0a09" }] },
  { name: "red", shades: [{ step: 50, hex: "#fef2f2" }, { step: 100, hex: "#fee2e2" }, { step: 200, hex: "#fecaca" }, { step: 300, hex: "#fca5a5" }, { step: 400, hex: "#f87171" }, { step: 500, hex: "#ef4444" }, { step: 600, hex: "#dc2626" }, { step: 700, hex: "#b91c1c" }, { step: 800, hex: "#991b1b" }, { step: 900, hex: "#7f1d1d" }, { step: 950, hex: "#450a0a" }] },
  { name: "orange", shades: [{ step: 50, hex: "#fff7ed" }, { step: 100, hex: "#ffedd5" }, { step: 200, hex: "#fed7aa" }, { step: 300, hex: "#fdba74" }, { step: 400, hex: "#fb923c" }, { step: 500, hex: "#f97316" }, { step: 600, hex: "#ea580c" }, { step: 700, hex: "#c2410c" }, { step: 800, hex: "#9a3412" }, { step: 900, hex: "#7c2d12" }, { step: 950, hex: "#431407" }] },
  { name: "amber", shades: [{ step: 50, hex: "#fffbeb" }, { step: 100, hex: "#fef3c7" }, { step: 200, hex: "#fde68a" }, { step: 300, hex: "#fcd34d" }, { step: 400, hex: "#fbbf24" }, { step: 500, hex: "#f59e0b" }, { step: 600, hex: "#d97706" }, { step: 700, hex: "#b45309" }, { step: 800, hex: "#92400e" }, { step: 900, hex: "#78350f" }, { step: 950, hex: "#451a03" }] },
  { name: "yellow", shades: [{ step: 50, hex: "#fefce8" }, { step: 100, hex: "#fef9c3" }, { step: 200, hex: "#fef08a" }, { step: 300, hex: "#fde047" }, { step: 400, hex: "#facc15" }, { step: 500, hex: "#eab308" }, { step: 600, hex: "#ca8a04" }, { step: 700, hex: "#a16207" }, { step: 800, hex: "#854d0e" }, { step: 900, hex: "#713f12" }, { step: 950, hex: "#422006" }] },
  { name: "lime", shades: [{ step: 50, hex: "#f7fee7" }, { step: 100, hex: "#ecfccb" }, { step: 200, hex: "#d9f99d" }, { step: 300, hex: "#bef264" }, { step: 400, hex: "#a3e635" }, { step: 500, hex: "#84cc16" }, { step: 600, hex: "#65a30d" }, { step: 700, hex: "#4d7c0f" }, { step: 800, hex: "#3f6212" }, { step: 900, hex: "#365314" }, { step: 950, hex: "#1a2e05" }] },
  { name: "green", shades: [{ step: 50, hex: "#f0fdf4" }, { step: 100, hex: "#dcfce7" }, { step: 200, hex: "#bbf7d0" }, { step: 300, hex: "#86efac" }, { step: 400, hex: "#4ade80" }, { step: 500, hex: "#22c55e" }, { step: 600, hex: "#16a34a" }, { step: 700, hex: "#15803d" }, { step: 800, hex: "#166534" }, { step: 900, hex: "#14532d" }, { step: 950, hex: "#052e16" }] },
  { name: "emerald", shades: [{ step: 50, hex: "#ecfdf5" }, { step: 100, hex: "#d1fae5" }, { step: 200, hex: "#a7f3d0" }, { step: 300, hex: "#6ee7b7" }, { step: 400, hex: "#34d399" }, { step: 500, hex: "#10b981" }, { step: 600, hex: "#059669" }, { step: 700, hex: "#047857" }, { step: 800, hex: "#065f46" }, { step: 900, hex: "#064e3b" }, { step: 950, hex: "#022c22" }] },
  { name: "teal", shades: [{ step: 50, hex: "#f0fdfa" }, { step: 100, hex: "#ccfbf1" }, { step: 200, hex: "#99f6e4" }, { step: 300, hex: "#5eead4" }, { step: 400, hex: "#2dd4bf" }, { step: 500, hex: "#14b8a6" }, { step: 600, hex: "#0d9488" }, { step: 700, hex: "#0f766e" }, { step: 800, hex: "#115e59" }, { step: 900, hex: "#134e4a" }, { step: 950, hex: "#042f2e" }] },
  { name: "cyan", shades: [{ step: 50, hex: "#ecfeff" }, { step: 100, hex: "#cffafe" }, { step: 200, hex: "#a5f3fc" }, { step: 300, hex: "#67e8f9" }, { step: 400, hex: "#22d3ee" }, { step: 500, hex: "#06b6d4" }, { step: 600, hex: "#0891b2" }, { step: 700, hex: "#0e7490" }, { step: 800, hex: "#155e75" }, { step: 900, hex: "#164e63" }, { step: 950, hex: "#083344" }] },
  { name: "sky", shades: [{ step: 50, hex: "#f0f9ff" }, { step: 100, hex: "#e0f2fe" }, { step: 200, hex: "#bae6fd" }, { step: 300, hex: "#7dd3fc" }, { step: 400, hex: "#38bdf8" }, { step: 500, hex: "#0ea5e9" }, { step: 600, hex: "#0284c7" }, { step: 700, hex: "#0369a1" }, { step: 800, hex: "#075985" }, { step: 900, hex: "#0c4a6e" }, { step: 950, hex: "#082f49" }] },
  { name: "blue", shades: [{ step: 50, hex: "#eff6ff" }, { step: 100, hex: "#dbeafe" }, { step: 200, hex: "#bfdbfe" }, { step: 300, hex: "#93c5fd" }, { step: 400, hex: "#60a5fa" }, { step: 500, hex: "#3b82f6" }, { step: 600, hex: "#2563eb" }, { step: 700, hex: "#1d4ed8" }, { step: 800, hex: "#1e40af" }, { step: 900, hex: "#1e3a8a" }, { step: 950, hex: "#172554" }] },
  { name: "indigo", shades: [{ step: 50, hex: "#eef2ff" }, { step: 100, hex: "#e0e7ff" }, { step: 200, hex: "#c7d2fe" }, { step: 300, hex: "#a5b4fc" }, { step: 400, hex: "#818cf8" }, { step: 500, hex: "#6366f1" }, { step: 600, hex: "#4f46e5" }, { step: 700, hex: "#4338ca" }, { step: 800, hex: "#3730a3" }, { step: 900, hex: "#312e81" }, { step: 950, hex: "#1e1b4b" }] },
  { name: "violet", shades: [{ step: 50, hex: "#f5f3ff" }, { step: 100, hex: "#ede9fe" }, { step: 200, hex: "#ddd6fe" }, { step: 300, hex: "#c4b5fd" }, { step: 400, hex: "#a78bfa" }, { step: 500, hex: "#8b5cf6" }, { step: 600, hex: "#7c3aed" }, { step: 700, hex: "#6d28d9" }, { step: 800, hex: "#5b21b6" }, { step: 900, hex: "#4c1d95" }, { step: 950, hex: "#2e1065" }] },
  { name: "purple", shades: [{ step: 50, hex: "#faf5ff" }, { step: 100, hex: "#f3e8ff" }, { step: 200, hex: "#e9d5ff" }, { step: 300, hex: "#d8b4fe" }, { step: 400, hex: "#c084fc" }, { step: 500, hex: "#a855f7" }, { step: 600, hex: "#9333ea" }, { step: 700, hex: "#7e22ce" }, { step: 800, hex: "#6b21a8" }, { step: 900, hex: "#581c87" }, { step: 950, hex: "#3b0764" }] },
  { name: "fuchsia", shades: [{ step: 50, hex: "#fdf4ff" }, { step: 100, hex: "#fae8ff" }, { step: 200, hex: "#f5d0fe" }, { step: 300, hex: "#f0abfc" }, { step: 400, hex: "#e879f9" }, { step: 500, hex: "#d946ef" }, { step: 600, hex: "#c026d3" }, { step: 700, hex: "#a21caf" }, { step: 800, hex: "#86198f" }, { step: 900, hex: "#701a75" }, { step: 950, hex: "#4a044e" }] },
  { name: "pink", shades: [{ step: 50, hex: "#fdf2f8" }, { step: 100, hex: "#fce7f3" }, { step: 200, hex: "#fbcfe8" }, { step: 300, hex: "#f9a8d4" }, { step: 400, hex: "#f472b6" }, { step: 500, hex: "#ec4899" }, { step: 600, hex: "#db2777" }, { step: 700, hex: "#be185d" }, { step: 800, hex: "#9d174d" }, { step: 900, hex: "#831843" }, { step: 950, hex: "#500724" }] },
  { name: "rose", shades: [{ step: 50, hex: "#fff1f2" }, { step: 100, hex: "#ffe4e6" }, { step: 200, hex: "#fecdd3" }, { step: 300, hex: "#fda4af" }, { step: 400, hex: "#fb7185" }, { step: 500, hex: "#f43f5e" }, { step: 600, hex: "#e11d48" }, { step: 700, hex: "#be123c" }, { step: 800, hex: "#9f1239" }, { step: 900, hex: "#881337" }, { step: 950, hex: "#4c0519" }] },
];

// Radius tokens
const radiusTokens = [
  { name: "radius-sm", cssVar: "--radius-sm", twClass: "rounded-sm", computed: "calc(var(--radius) - 4px)", px: "~6px" },
  { name: "radius-md", cssVar: "--radius-md", twClass: "rounded-md", computed: "calc(var(--radius) - 2px)", px: "~8px" },
  { name: "radius-lg (base)", cssVar: "--radius", twClass: "rounded-lg", computed: "var(--radius)", px: "10px" },
  { name: "radius-xl", cssVar: "--radius-xl", twClass: "rounded-xl", computed: "calc(var(--radius) + 4px)", px: "~14px" },
  { name: "radius-full", cssVar: "—", twClass: "rounded-full", computed: "9999px", px: "9999px" },
];

// Shadow tokens
const shadowTokens = [
  {
    name: "elevation-1",
    cssVar: "--shadow-elevation-1",
    twClass: "shadow-elevation-1",
    usage: "Subtle. Cards at rest, default state.",
  },
  {
    name: "elevation-2",
    cssVar: "--shadow-elevation-2",
    twClass: "shadow-elevation-2",
    usage: "Dropdowns, popovers, focused cards.",
  },
  {
    name: "elevation-3",
    cssVar: "--shadow-elevation-3",
    twClass: "shadow-elevation-3",
    usage: "Modals, dialogs, hover lifted cards.",
  },
  {
    name: "elevation-4",
    cssVar: "--shadow-elevation-4",
    twClass: "shadow-elevation-4",
    usage: "Sheets, drawers, top-level overlays.",
  },
];

// Animation tokens
const animationTokens = [
  { name: "fade-in", cssClass: "fade-in", duration: "0.3s ease-out", desc: "Fades in + slides up 10px. Entry for panels, cards, alerts." },
  { name: "slide-in-right", cssClass: "slide-in-right", duration: "0.3s ease-out", desc: "Slides in from right (100%). Entry for drawers, sheets." },
  { name: "slide-in-left", cssClass: "slide-in-left", duration: "0.3s ease-out", desc: "Slides in from left (-100%). Entry for sidebars, back transitions." },
  { name: "skeleton-pulse", cssClass: "skeleton-pulse", duration: "1.5s ease-in-out ∞", desc: "Opacity pulse 0.6 → 1 → 0.6. Loading skeleton indicator." },
  { name: "loading-dots", cssClass: "loading-dots", duration: "1.4s ∞", desc: "3-dot staggered opacity cycle. Use with 3 <span> children." },
  { name: "accordion-down", cssClass: "animate-accordion-down", duration: "0.2s ease-out", desc: "Height 0 → content height. Radix Accordion open." },
  { name: "accordion-up", cssClass: "animate-accordion-up", duration: "0.2s ease-out", desc: "Height content → 0. Radix Accordion close." },
];

// Utility classes
const utilityTokens = [
  { name: "hover-lift", cssClass: ".hover-lift", desc: "translateY(-2px) + elevation-3 shadow on :hover. 0.3s cubic.", demo: "Hover me" },
  { name: "hover-scale", cssClass: ".hover-scale", desc: "scale(1.02) on :hover. 0.3s cubic. Subtle zoom effect.", demo: "Hover me" },
  { name: "hover-brightness", cssClass: ".hover-brightness", desc: "brightness(1.1) on :hover. 0.3s cubic. Ideal for images.", demo: "Hover me" },
  { name: "glass-effect", cssClass: ".glass-effect", desc: "70% opaque bg + backdrop-blur(12px) + semi-transparent border.", demo: "Glass" },
  { name: "focus-ring", cssClass: ".focus-ring", desc: "outline-none + focus-visible:ring-2/ring/ring-offset-2.", demo: "Focus me" },
  { name: "focus-ring-inset", cssClass: ".focus-ring-inset", desc: "outline-none + focus-visible:ring-2 ring-inset.", demo: "Focus me" },
  { name: "transition-colors-smooth", cssClass: ".transition-colors-smooth", desc: "color, bg, border 0.3s cubic transition.", demo: "Hover me" },
  { name: "no-scrollbar", cssClass: ".no-scrollbar", desc: "Hides scrollbar on WebKit and Firefox. overflow still works.", demo: "Scroll hidden" },
];

// Typography scale
const typeScale = [
  { tag: "h1", twClass: "text-2xl font-medium", size: "1.5rem / 24px", weight: "500 Medium", lh: "1.5" },
  { tag: "h2", twClass: "text-xl font-medium", size: "1.25rem / 20px", weight: "500 Medium", lh: "1.5" },
  { tag: "h3", twClass: "text-lg font-medium", size: "1.125rem / 18px", weight: "500 Medium", lh: "1.5" },
  { tag: "h4", twClass: "text-base font-medium", size: "1rem / 16px", weight: "500 Medium", lh: "1.5" },
  { tag: "p (body)", twClass: "text-sm", size: "0.875rem / 14px", weight: "400 Regular", lh: "1.5" },
  { tag: "small", twClass: "text-xs", size: "0.75rem / 12px", weight: "400 Regular", lh: "1.5" },
  { tag: "label/Button", twClass: "text-base font-medium", size: "1rem / 16px", weight: "500 Medium", lh: "1.5" },
  { tag: "input", twClass: "text-base font-normal", size: "1rem / 16px", weight: "400 Regular", lh: "1.5" },
];

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ────────────────────────────────────────────

function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const { copy, copied } = useCopy();
  return (
    <button
      onClick={() => copy(text)}
      className={`inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors ${className}`}
    >
      {copied === text ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
      {text}
    </button>
  );
}

/** Color swatch that reads its LIVE computed hex from the DOM */
function ColorSwatch({ token, liveValues }: { token: ColorToken; liveValues: Record<string, string> }) {
  const liveHex = toHex(liveValues[token.cssVar] || "");

  return (
    <div className="flex flex-col gap-2 min-w-0">
      {/* Swatch */}
      <div
        className={`h-14 w-full rounded-[10px] border border-border/50 relative overflow-hidden flex items-center justify-center ${token.twBg || ""}`}
      >
        {token.fgVar && (
          <span className={`text-xs select-none opacity-70 ${token.twText || ""}`}>
            Aa
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="space-y-0.5">
        <p className="text-xs font-medium truncate">{token.name}</p>
        <CopyButton text={token.cssVar} />
        {token.twBg && <CopyButton text={token.twBg} />}
        {token.twText && !token.twBg && <CopyButton text={token.twText} />}
        {token.twBorder && !token.twBg && !token.twText && <CopyButton text={token.twBorder} />}

        {/* Live computed value */}
        {liveHex && (
          <div className="flex items-center gap-1.5 mt-1">
            <Monitor className="size-2.5 .5 text-muted-foreground shrink-0" />
            <CopyButton text={liveHex} />
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

/** Banner showing active color mode */
function TenantBanner() {
  const { colorMode } = useTheme();
  const info = { id: "cesionbnk", name: "CESIONBNK", primary: "#374151", secondary: "#796eff" };

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-[10px] border border-primary bg-card">
      <Palette className="size-4 text-primary shrink-0" />
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="size-3.5 .5 rounded-full shrink-0 border border-border bg-primary"
        />
        <span className="text-sm font-medium">{info.name}</span>
        <Badge variant="outline" className="text-[10px]">{FONT_INFO.name}</Badge>
        <Badge variant="outline" className="text-[10px]">
          {colorMode === "dark" ? <Moon className="size-2.5 .5 mr-1" /> : <Sun className="size-2.5 .5 mr-1" />}
          {colorMode}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground ml-auto hidden md:block">
        Values shown are live-computed for the active mode.
      </p>
    </div>
  );
}

// ────────────────────────────────────────────
// TABS CONTENT
// ─────────────────────────────────────────────

function ColorsTab() {
  const { copy } = useCopy();
  const liveValues = useLiveTokens([...ALL_COLOR_VARS, ...KPI_VARS]);

  return (
    <div className="space-y-10">
      {/* Main color groups */}
      {colorGroups.map((group) => (
        <div key={group.title}>
          <SectionHeader title={group.title} description={group.description} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {group.tokens.map((token) => (
              <ColorSwatch key={token.name} token={token} liveValues={liveValues} />
            ))}
          </div>
          <Separator className="mt-8" />
        </div>
      ))}

      {/* KPI Colors */}
      <div>
        <SectionHeader
          title="KPI Colors"
          description="KPI colors with light/dark mode support. Usage: className='bg-kpi-yellow text-kpi-blue'."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {kpiTokens.map((t) => {
            const liveBase = toHex(liveValues[t.cssVar] || "");
            const liveDark = toHex(liveValues[t.darkVar] || "");
            const liveBg = toHex(liveValues[t.bgVar] || "");
            return (
              <div key={t.name} className="space-y-2">
                <CssVarBox cssVar={t.cssVar} className="h-14 rounded-[10px] border border-border/50" />
                <p className="text-xs font-medium">{t.name}</p>
                <button
                  onClick={() => copy(t.cssVar)}
                  className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary"
                >
                  <Copy className="size-3" /> {t.cssVar}
                </button>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Monitor className="size-2.5 .5" />{liveBase || "—"}
                  </span>
                  <span className="text-[10px] text-muted-foreground/30">·</span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    dark: {liveDark || "—"}
                  </span>
                </div>
                <CssVarBox cssVar={t.bgVar} className="h-6 rounded-md" />
                <p className="text-[10px] text-muted-foreground font-mono">{t.bgVar} → {liveBg || "—"}</p>
              </div>
            );
          })}
        </div>
        <Separator className="mt-8" />
      </div>

      {/* Tailwind Color Palette */}
      <div>
        <SectionHeader
          title="Tailwind Color Palette"
          description="Full Tailwind CSS v4 color palette for reference. Click any swatch to copy its hex value. Use as bg-{color}-{step} or text-{color}-{step}."
        />
        <div className="space-y-3">
          {tailwindPalette.map((scale) => (
            <div key={scale.name} className="flex items-center gap-2">
              <p className="text-xs font-medium w-16 shrink-0 text-right text-muted-foreground">{scale.name}</p>
              <div className="flex flex-1 gap-0.5">
                {scale.shades.map((shade) => (
                  <HexButton
                    key={shade.step}
                    onClick={() => copy(shade.hex)}
                    hex={shade.hex}
                    className="group relative flex-1 h-10 rounded-sm transition-transform hover:scale-110 hover:z-10 hover:shadow-md"
                    title={`${scale.name}-${shade.step}: ${shade.hex}`}
                  >
                    <span className={`absolute inset-0 flex items-center justify-center text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-opacity ${shade.step >= 500 ? "text-white" : "text-black"}`}>
                      {shade.step}
                    </span>
                  </HexButton>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Scale legend */}
        <div className="flex items-center gap-2 mt-3">
          <div className="w-16 shrink-0" />
          <div className="flex flex-1 gap-0.5">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => (
              <p key={step} className="flex-1 text-center text-[8px] text-muted-foreground font-mono">{step}</p>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

function TypographyTab() {
  const { copy } = useCopy();
  const fontInfo = FONT_INFO;
  const tenantName = "CESIONBNK";

  // Read live --font-sans and --letter-spacing-base
  const liveTypo = useLiveTokens(["--font-sans", "--letter-spacing-base", "--radius"]);
  const liveFontSans = liveTypo["--font-sans"] || fontInfo.name;
  const liveLetterSpacing = liveTypo["--letter-spacing-base"] || "0.025em";
  const weights = [
    { label: "Light", weight: "300", class: "font-light" },
    { label: "Regular", weight: "400", class: "font-normal" },
    { label: "Medium", weight: "500", class: "font-medium" },
    { label: "SemiBold", weight: "600", class: "font-semibold" },
    { label: "Bold", weight: "700", class: "font-bold" },
  ];
  return (
    <div className="space-y-10">
      {/* Font Family */}
      <div>
        <SectionHeader title="Font Family" description={`Active typeface: ${tenantName}. Defined via --font-sans.`} />
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <FontFamilyText fontFamily={liveFontSans} className="text-5xl font-medium tracking-tight">
                  {fontInfo.name}
                </FontFamilyText>
                <FontFamilyText fontFamily={liveFontSans} className="text-lg text-muted-foreground mt-1">
                  The quick brown fox jumps over the lazy dog.
                </FontFamilyText>
                <FontFamilyText fontFamily={liveFontSans} className="text-sm text-muted-foreground">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz · 0123456789
                </FontFamilyText>
                <FontFamilyText fontFamily={liveFontSans} className="text-sm text-muted-foreground">
                  !@#$%^&amp;*()_+-=[]{}|;':,&lt;&gt;?/ · AEIOU Ñ ü (Latin Extended)
                </FontFamilyText>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <button onClick={() => copy("--font-sans")} className="flex items-center gap-1 hover:text-primary font-mono">
                  <Copy className="size-3" /> --font-sans
                </button>
                <button onClick={() => copy("font-sans")} className="flex items-center gap-1 hover:text-primary font-mono">
                  <Copy className="size-3" /> font-sans
                </button>
                <p className="text-[10px]">Source: {fontInfo.source}</p>
                <Badge variant="outline" className="text-[10px]">Weights: {fontInfo.weights}</Badge>
                <Badge variant="outline" className="text-[10px] mt-1">{tenantName}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weights */}
      <div>
        <SectionHeader title="Font Weights" description={`5 weights available for ${fontInfo.name}.`} />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {weights.map((w) => (
            <Card key={w.weight}>
              <CardContent className="p-4 text-center">
                <FontFamilyText fontFamily={liveFontSans} fontWeight={w.weight} className="text-2xl mb-2">
                  Aa
                </FontFamilyText>
                <p className="text-xs font-medium">{w.label}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{w.weight}</p>
                <button
                  onClick={() => copy(w.class)}
                  className="flex items-center justify-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary mx-auto mt-1"
                >
                  <Copy className="size-3" /> {w.class}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Type Scale */}
      <div>
        <SectionHeader title="Type Scale" description="Default scale defined in config.css @layer base. Apply Tailwind text-* classes to override." />
        <div className="rounded-[10px] border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted">
                <th className="text-left px-4 py-2 font-medium text-xs text-muted-foreground">Element</th>
                <th className="text-left px-4 py-2 font-medium text-xs text-muted-foreground">Preview</th>
                <th className="text-left px-4 py-2 font-medium text-xs text-muted-foreground">Size</th>
                <th className="text-left px-4 py-2 font-medium text-xs text-muted-foreground">Weight</th>
                <th className="text-left px-4 py-2 font-medium text-xs text-muted-foreground">Line Height</th>
                <th className="text-left px-4 py-2 font-medium text-xs text-muted-foreground">Class</th>
              </tr>
            </thead>
            <tbody>
              {typeScale.map((row, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted">
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-[10px] font-mono">{row.tag}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <FontFamilyText fontFamily={liveFontSans} className={row.twClass}>
                      {tenantName}
                    </FontFamilyText>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{row.size}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{row.weight}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{row.lh}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => copy(row.twClass)}
                      className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary"
                    >
                      <Copy className="size-3" />{row.twClass}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Letter Spacing */}
        <div className="mt-4 p-4 rounded-[10px] border bg-muted flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm font-medium">Letter Spacing — Global</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Applied to all typographic elements via <code className="font-mono bg-muted px-1 rounded">letter-spacing: var(--letter-spacing-base)</code>
            </p>
          </div>
          <div className="text-right space-y-1">
            <button onClick={() => copy("--letter-spacing-base")} className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary ml-auto">
              <Copy className="size-3" /> --letter-spacing-base
            </button>
            <p className="text-xs font-mono text-primary">{liveLetterSpacing}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShapeTab() {
  const { copy } = useCopy();
  const liveShape = useLiveTokens(["--radius"]);
  const liveRadius = liveShape["--radius"] || "0.625rem";

  return (
    <div className="space-y-10">
      <div>
        <SectionHeader
          title="Border Radius"
          description={`Base radius is ${liveRadius}. All variants are computed from --radius via calc(). The design rule is: consistent rounding, no sharp corners.`}
        />

        {/* Visual Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {radiusTokens.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-3">
              <RadiusBox
                value={r.cssVar === "—" ? "9999px" : `var(${r.cssVar === "--radius" ? "--radius" : r.cssVar === "--radius-xl" ? "--radius-xl" : r.cssVar})`}
                className="size-20 bg-muted border-2 border-primary flex items-center justify-center"
              >
                <span className="text-xs font-medium text-primary">{r.px}</span>
              </RadiusBox>
              <div className="text-center space-y-0.5">
                <p className="text-xs font-medium">{r.name}</p>
                {r.cssVar !== "—" && (
                  <button onClick={() => copy(r.cssVar)} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary mx-auto">
                    <Copy className="size-3" />{r.cssVar}
                  </button>
                )}
                <button onClick={() => copy(r.twClass)} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary mx-auto">
                  <Copy className="size-3" />{r.twClass}
                </button>
                <p className="text-[10px] text-muted-foreground font-mono">{r.computed}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reference Table */}
        <div className="rounded-[10px] border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted">
                {["Token", "CSS Var", "Tailwind", "Value", "Pixels"].map((h) => (
                  <th key={h} className="text-left px-4 py-2 font-medium text-xs text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {radiusTokens.map((r, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted">
                  <td className="px-4 py-2.5 text-xs font-medium">{r.name}</td>
                  <td className="px-4 py-2.5">
                    {r.cssVar !== "—" ? (
                      <button onClick={() => copy(r.cssVar)} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary">
                        <Copy className="size-3" />{r.cssVar}
                      </button>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <button onClick={() => copy(r.twClass)} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary">
                      <Copy className="size-3" />{r.twClass}
                    </button>
                  </td>
                  <td className="px-4 py-2.5 text-[10px] font-mono text-muted-foreground">{r.computed}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant="outline" className="text-[10px] font-mono">{r.px}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ShadowsTab() {
  const { copy } = useCopy();
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Elevation & Shadows"
        description="4-level elevation system. Shadows use foreground-based rgba in light, pure black in dark. CSS var: --shadow-elevation-N"
      />

      {/* Visual Previews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shadowTokens.map((s) => (
          <div key={s.name} className="flex flex-col gap-3">
            <ShadowBox
              cssVar={s.cssVar}
              className="h-24 rounded-[10px] bg-card flex items-center justify-center"
            >
              <p className="text-xs font-medium text-muted-foreground">{s.name}</p>
            </ShadowBox>
            <div className="space-y-1">
              <p className="text-xs font-medium">{s.name}</p>
              <button onClick={() => copy(s.cssVar)} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary">
                <Copy className="size-3" />{s.cssVar}
              </button>
              <button onClick={() => copy(s.twClass)} className="flex items-center gap-1 text-[10px] font-mono text-primary hover:text-primary/70">
                <Copy className="size-3" />{s.twClass}
              </button>
              <p className="text-[10px] text-muted-foreground">{s.usage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Table */}
      <div className="rounded-[10px] border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted">
              {["Token", "CSS Var", "Tailwind class", "Usage"].map((h) => (
                <th key={h} className="text-left px-4 py-2 font-medium text-xs text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shadowTokens.map((s, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-muted">
                <td className="px-4 py-2.5 text-xs font-medium">{s.name}</td>
                <td className="px-4 py-2.5">
                  <button onClick={() => copy(s.cssVar)} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary">
                    <Copy className="size-3" />{s.cssVar}
                  </button>
                </td>
                <td className="px-4 py-2.5">
                  <button onClick={() => copy(s.twClass)} className="flex items-center gap-1 text-[10px] font-mono text-primary hover:text-primary/70">
                    <Copy className="size-3" />{s.twClass}
                  </button>
                </td>
                <td className="px-4 py-2.5 text-[10px] text-muted-foreground">{s.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Usage note */}
      <div className="p-4 rounded-[10px] bg-muted border text-sm text-muted-foreground space-y-2">
        <p className="font-medium text-foreground">Usage</p>
        <p>
          Via Tailwind class (recommended):{" "}
          <code className="font-mono bg-muted px-1 rounded text-xs">className="shadow-elevation-2"</code>
          {" "}— resolves the correct value automatically for light <em>and</em> dark mode.
        </p>
        <p>
          Via inline style:{" "}
          <code className="font-mono bg-muted px-1 rounded text-xs">style=&#123;&#123; boxShadow: "var(--shadow-elevation-2)" &#125;&#125;</code>
        </p>
        <p>
          Via hover utility:{" "}
          <code className="font-mono bg-muted px-1 rounded text-xs">.hover-lift</code>
          {" "}applies elevation-3 shadow + translateY(-2px) on :hover automatically.
        </p>
      </div>
    </div>
  );
}

function AnimationsTab() {
  const { copy } = useCopy();
  const [playing, setPlaying] = useState<string | null>(null);

  const play = (cls: string) => {
    setPlaying(cls);
    setTimeout(() => setPlaying(null), 1600);
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Animations"
        description="CSS keyframe animations defined in animations.css. Apply as className to any element. Respect prefers-reduced-motion: the system disables all animations automatically."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {animationTokens.map((a) => (
          <Card key={a.name}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{a.name}</p>
                    <Badge variant="outline" className="text-[10px] font-mono">{a.duration}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                  <button onClick={() => copy(a.cssClass)} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary">
                    <Copy className="size-3" />{a.cssClass}
                  </button>
                </div>

                {/* Demo box */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div
                    key={playing === a.cssClass ? `play-${Date.now()}` : a.cssClass}
                    className={`size-10 rounded-[10px] bg-muted border border-border flex items-center justify-center ${
                      playing === a.cssClass ? a.cssClass : ""
                    }`}
                  >
                    <div className="size-4 rounded-sm bg-primary" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-[10px]"
                    onClick={() => play(a.cssClass)}
                  >
                    Play
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reduced motion note */}
      <div className="p-4 rounded-[10px] bg-muted border text-sm space-y-1">
        <p className="font-medium">prefers-reduced-motion</p>
        <p className="text-muted-foreground text-xs">
          All animations, transitions, and hover transforms are disabled with <code className="font-mono bg-muted px-1 rounded">duration: 0.01ms</code> when the user has reduced motion enabled in their OS. No extra configuration needed.
        </p>
      </div>
    </div>
  );
}

function UtilitiesTab() {
  const { copy } = useCopy();
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Utility Classes"
        description="Custom utilities defined in config.css @layer utilities. Add these classes directly in JSX className. They complement Tailwind's built-in utilities."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {utilityTokens.map((u) => (
          <Card key={u.name}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1.5">
                  <p className="text-sm font-medium">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.desc}</p>
                  <button onClick={() => copy(u.cssClass)} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary">
                    <Copy className="size-3" />{u.cssClass}
                  </button>
                </div>
                {/* Live demo */}
                <div className="shrink-0">
                  <div
                    className={`h-10 px-3 rounded-[10px] border border-border bg-card text-xs flex items-center justify-center cursor-pointer select-none ${
                      u.cssClass === ".hover-lift" ? "hover-lift" :
                      u.cssClass === ".hover-scale" ? "hover-scale" :
                      u.cssClass === ".hover-brightness" ? "hover-brightness bg-primary text-primary-foreground" :
                      u.cssClass === ".glass-effect" ? "glass-effect" :
                      u.cssClass === ".transition-colors-smooth" ? "transition-colors-smooth hover:bg-primary hover:text-primary-foreground" :
                      u.cssClass === ".focus-ring" ? "focus-ring" :
                      u.cssClass === ".focus-ring-inset" ? "focus-ring-inset" :
                      ""
                    }`}
                    tabIndex={0}
                  >
                    {u.demo}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Animations reference */}
      <div className="p-4 rounded-[10px] bg-muted border space-y-2">
        <p className="text-sm font-medium">Tip: Combining Utilities</p>
        <div className="space-y-1 text-xs text-muted-foreground font-mono">
          <p><span className="text-primary">hover-lift</span> + <span className="text-primary">transition-colors-smooth</span> → lift + smooth color change on hover</p>
          <p><span className="text-primary">glass-effect</span> + <span className="text-primary">hover-scale</span> → glassmorphism card with scale on hover</p>
          <p><span className="text-primary">focus-ring</span> → required on all interactive custom elements for a11y</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SPACING TAB
// ─────────────────────────────────────────────
const SPACING_SCALE = [
  { step: "px",  px: "1px",  cssVar: "--space-px",  tw: "p-px / m-px"  },
  { step: "1",   px: "4px",  cssVar: "--space-1",   tw: "p-1 / m-1"    },
  { step: "2",   px: "8px",  cssVar: "--space-2",   tw: "p-2 / m-2"    },
  { step: "3",   px: "12px", cssVar: "--space-3",   tw: "p-3 / m-3"    },
  { step: "4",   px: "16px", cssVar: "--space-4",   tw: "p-4 / m-4"    },
  { step: "5",   px: "20px", cssVar: "--space-5",   tw: "p-5 / m-5"    },
  { step: "6",   px: "24px", cssVar: "--space-6",   tw: "p-6 / m-6"    },
  { step: "8",   px: "32px", cssVar: "--space-8",   tw: "p-8 / m-8"    },
  { step: "10",  px: "40px", cssVar: "--space-10",  tw: "p-10 / m-10"  },
  { step: "12",  px: "48px", cssVar: "--space-12",  tw: "p-12 / m-12"  },
  { step: "16",  px: "64px", cssVar: "--space-16",  tw: "p-16 / m-16"  },
  { step: "20",  px: "80px", cssVar: "--space-20",  tw: "p-20 / m-20"  },
  { step: "24",  px: "96px", cssVar: "--space-24",  tw: "p-24 / m-24"  },
];

const SPACING_USAGE = [
  { range: "1–2  (4–8px)",   use: "Gaps internos: icon + label, badge padding, radio gap" },
  { range: "3–4  (12–16px)", use: "Padding de componentes: Input, Button, Card header" },
  { range: "5–6  (20–24px)", use: "Separación entre elementos de un formulario o lista" },
  { range: "8–10 (32–40px)", use: "Separación entre secciones de una página" },
  { range: "12+  (48px+)",   use: "Márgenes de página, padding de layouts (SidebarInset)" },
];

function SpacingTab() {
  const { copy } = useCopy();
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Spacing Scale"
        description="Escala de 4px. Todos los valores de padding, margin, gap y size deben ser múltiplos de 4px. Los tokens CSS están disponibles vía var(--space-N) y como utilidades Tailwind estándar."
      />

      {/* Visual scale */}
      <div className="space-y-1">
        {SPACING_SCALE.map((s) => {
          const pxVal = parseInt(s.px) || 1;
          const barW = Math.min(Math.round((pxVal / 96) * 100), 100);
          return (
            <div key={s.step} className="flex items-center gap-4 py-1.5 border-b border-border last:border-0">
              <span className="w-8 text-xs font-mono text-muted-foreground shrink-0 text-right">{s.step}</span>
              <div className="flex-1 flex items-center gap-3">
                <div className="h-5 bg-primary rounded-sm shrink-0" style={{ width: `${Math.max(barW, 1)}%` }} />
              </div>
              <span className="w-12 text-xs font-mono text-foreground shrink-0 text-right">{s.px}</span>
              <button onClick={() => copy(s.cssVar)} className="w-28 text-left flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary shrink-0">
                <Copy className="size-3 shrink-0" />{s.cssVar}
              </button>
              <span className="w-24 text-xs font-mono text-muted-foreground shrink-0 hidden md:block">{s.tw}</span>
            </div>
          );
        })}
      </div>

      {/* Usage guide */}
      <div>
        <p className="text-sm font-medium mb-3">Guía de uso</p>
        <div className="rounded-xl border border-border overflow-hidden">
          {SPACING_USAGE.map((u, i) => (
            <div key={i} className="flex items-start gap-4 px-4 py-3 border-b border-border last:border-0 odd:bg-muted/30">
              <code className="text-xs font-mono text-primary shrink-0 pt-0.5">{u.range}</code>
              <span className="text-sm text-muted-foreground">{u.use}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Base grid note */}
      <div className="p-4 rounded-xl bg-info/8 border border-info/20 text-sm text-info-on-subtle">
        <strong>Base grid: 4px.</strong> Cualquier valor fuera de la escala (ej. 5px, 7px, 11px) es una desviación.
        Usa siempre múltiplos de 4. Excepción permitida: <code className="font-mono">1px</code> para bordes y divisores.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MOTION TAB
// ─────────────────────────────────────────────
const DURATION_TOKENS = [
  { name: "instant", cssVar: "--duration-instant", value: "50ms",  use: "Tooltips aparecer, checkmarks" },
  { name: "fast",    cssVar: "--duration-fast",    value: "100ms", use: "Hover states, focus rings, badges" },
  { name: "base",    cssVar: "--duration-base",    value: "200ms", use: "Modales, drawers, dropdowns — uso general" },
  { name: "slow",    cssVar: "--duration-slow",    value: "300ms", use: "Page transitions, sidebars, expansiones" },
  { name: "slower",  cssVar: "--duration-slower",  value: "500ms", use: "Onboarding, animaciones de entrada de página" },
  { name: "lazy",    cssVar: "--duration-lazy",    value: "700ms", use: "Loaders, spinners, ilustraciones" },
];

const EASING_TOKENS = [
  { name: "default", cssVar: "--ease-default", value: "cubic-bezier(0.4, 0, 0.2, 1)",    use: "Transiciones generales (hover, focus, color)" },
  { name: "in",      cssVar: "--ease-in",      value: "cubic-bezier(0.4, 0, 1, 1)",      use: "Elementos que salen de la pantalla (exit)" },
  { name: "out",     cssVar: "--ease-out",      value: "cubic-bezier(0, 0, 0.2, 1)",     use: "Elementos que entran a la pantalla (enter)" },
  { name: "spring",  cssVar: "--ease-spring",   value: "cubic-bezier(0.34, 1.56, 0.64, 1)", use: "Interacciones lúdicas, notificaciones, FAB" },
  { name: "linear",  cssVar: "--ease-linear",   value: "linear",                         use: "Progress bars, loaders, spinners" },
];

function MotionTab() {
  const { copy } = useCopy();
  const [activeEase, setActiveEase] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Motion System"
        description="Tokens de duración y easing. Usar siempre estos valores — nunca hardcodear ms o cubic-bezier. Todos los componentes respetan prefers-reduced-motion automáticamente vía Tailwind."
      />

      {/* Duration */}
      <div>
        <p className="text-sm font-medium mb-4">Duration Scale</p>
        <div className="space-y-2">
          {DURATION_TOKENS.map((d) => (
            <div key={d.name} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/40 transition-colors">
              <div className="w-20 shrink-0">
                <Badge variant="neutral-soft" className="font-mono text-xs">{d.value}</Badge>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium">{d.name}</span>
                  <button onClick={() => copy(d.cssVar)} className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary">
                    <Copy className="size-3" />{d.cssVar}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground truncate">{d.use}</p>
              </div>
              {/* Animated demo bar */}
              <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden shrink-0">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    animation: `slideRight ${d.value} var(--ease-default) infinite alternate`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Easing */}
      <div>
        <p className="text-sm font-medium mb-4">Easing Curves</p>
        <div className="grid gap-3 md:grid-cols-2">
          {EASING_TOKENS.map((e) => (
            <div
              key={e.name}
              className="p-4 rounded-lg border border-border cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
              onClick={() => setActiveEase(activeEase === e.name ? null : e.name)}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-medium">{e.name}</span>
                <button onClick={(ev) => { ev.stopPropagation(); copy(e.cssVar); }} className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary">
                  <Copy className="size-3" />{e.cssVar}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{e.use}</p>
              <div className="relative h-8 bg-muted rounded overflow-hidden">
                <div
                  className="absolute top-1 bottom-1 left-1 w-6 bg-primary rounded-sm"
                  style={{
                    animation: activeEase === e.name
                      ? `slideAcross 1s ${e.value} infinite alternate`
                      : undefined,
                    transform: activeEase === e.name ? undefined : "translateX(0)",
                  }}
                />
              </div>
              {activeEase === e.name && (
                <code className="text-2xs font-mono text-muted-foreground mt-2 block">{e.value}</code>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reduced motion */}
      <div className="p-4 rounded-xl bg-warning/8 border border-warning/20 text-sm text-warning-on-subtle space-y-1">
        <p className="font-medium">prefers-reduced-motion</p>
        <p>Tailwind aplica <code className="font-mono text-xs">motion-reduce:transition-none</code> automáticamente cuando el usuario activa "Reducir movimiento" en el SO. No necesitas implementarlo manualmente si usas clases Tailwind estándar.</p>
      </div>

      <style>{`
        @keyframes slideRight {
          from { transform: translateX(0%); }
          to   { transform: translateX(calc(100% - 4px)); width: 100%; }
        }
        @keyframes slideAcross {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(100% + 24px)); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────
// BREAKPOINTS TAB
// ─────────────────────────────────────────────
const BREAKPOINTS = [
  { name: "xs",  min: "0px",    max: "639px",   desc: "Mobile portrait — diseño base, columna única",       twPrefix: "(none)" },
  { name: "sm",  min: "640px",  max: "767px",   desc: "Mobile landscape / tablet pequeño — 2 columnas",    twPrefix: "sm:" },
  { name: "md",  min: "768px",  max: "1023px",  desc: "Tablet — sidebar colapsable, grids de 2–3 col",     twPrefix: "md:" },
  { name: "lg",  min: "1024px", max: "1279px",  desc: "Desktop estándar — sidebar expandido, 3–4 columnas",twPrefix: "lg:" },
  { name: "xl",  min: "1280px", max: "1535px",  desc: "Desktop amplio — layouts de 4–5 columnas",          twPrefix: "xl:" },
  { name: "2xl", min: "1536px", max: "∞",       desc: "Pantallas grandes — max-w-7xl centrado",            twPrefix: "2xl:" },
];

const GRID_PATTERNS = [
  { label: "Dashboard KPIs",   pattern: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",    desc: "4 stat cards en desktop, apilados en mobile" },
  { label: "Feature cards",    pattern: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",    desc: "3 columnas en desktop, 2 en tablet, 1 en mobile" },
  { label: "Form + sidebar",   pattern: "grid-cols-1 lg:grid-cols-[280px_1fr]",         desc: "Sidebar fijo + contenido fluido" },
  { label: "Data table",       pattern: "w-full overflow-x-auto",                       desc: "Scroll horizontal en mobile, tabla completa en desktop" },
  { label: "Factoring ops",    pattern: "grid-cols-1 md:grid-cols-[1fr_320px]",         desc: "Lista principal + panel de detalle" },
];

function BreakpointsTab() {
  const { copy } = useCopy();
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Breakpoints & Grid"
        description="Sistema de breakpoints heredado de Tailwind CSS v4. Mobile-first: define el estilo base para mobile y sobreescribe hacia arriba con prefijos sm:/md:/lg:/xl:."
      />

      {/* Breakpoints table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-b border-border">
              {["Breakpoint", "Min width", "Max width", "Prefijo TW", "Uso típico"].map(h => (
                <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BREAKPOINTS.map((bp, i) => (
              <tr key={bp.name} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>
                <td className="px-4 py-3 font-mono font-semibold text-primary">{bp.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-foreground">{bp.min}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{bp.max}</td>
                <td className="px-4 py-3">
                  <button onClick={() => copy(bp.twPrefix)} className="font-mono text-xs bg-muted px-2 py-0.5 rounded hover:bg-primary/10 hover:text-primary transition-colors">
                    {bp.twPrefix}
                  </button>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{bp.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visual ruler */}
      <div>
        <p className="text-sm font-medium mb-3">Visualización de rangos</p>
        <div className="relative h-10 rounded-lg overflow-hidden border border-border bg-muted flex">
          {[
            { label: "xs", w: "10%",  bg: "bg-primary/20"   },
            { label: "sm", w: "10%",  bg: "bg-primary/30"   },
            { label: "md", w: "15%",  bg: "bg-primary/45"   },
            { label: "lg", w: "20%",  bg: "bg-primary/60"   },
            { label: "xl", w: "20%",  bg: "bg-primary/75"   },
            { label: "2xl",w: "25%",  bg: "bg-primary/90"   },
          ].map(s => (
            <div key={s.label} className={`${s.w} ${s.bg} flex items-center justify-center border-r border-border/40 last:border-0`}>
              <span className="text-xs font-mono text-foreground">{s.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">Proporciones aproximadas — no a escala real</p>
      </div>

      {/* Grid patterns */}
      <div>
        <p className="text-sm font-medium mb-3">Patrones de grid responsivo — copiar y usar</p>
        <div className="space-y-2">
          {GRID_PATTERNS.map((p) => (
            <div key={p.label} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium mb-0.5">{p.label}</p>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
              <button
                onClick={() => copy(p.pattern)}
                className="flex items-center gap-1.5 shrink-0 font-mono text-xs bg-muted px-2.5 py-1.5 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Copy className="size-3" />
                <span className="hidden sm:inline">{p.pattern}</span>
                <span className="sm:hidden">copy</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Container widths */}
      <div className="p-4 rounded-xl bg-muted border border-border space-y-2">
        <p className="text-sm font-medium">Anchos de contenedor recomendados</p>
        <div className="space-y-1 text-xs font-mono text-muted-foreground">
          <p><span className="text-primary">max-w-3xl</span>  → 768px — texto largo, formularios de 1 columna</p>
          <p><span className="text-primary">max-w-5xl</span>  → 1024px — contenido con sidebar lateral</p>
          <p><span className="text-primary">max-w-7xl</span>  → 1280px — dashboards y vistas de datos</p>
          <p><span className="text-primary">w-full</span>     → tablas, layouts full-bleed dentro de SidebarInset</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export function DesignTokensPage() {
  const { colorMode } = useTheme();
  const fontInfo = FONT_INFO;

  const totalTokens =
    colorGroups.reduce((acc, g) => acc + g.tokens.length, 0) +
    kpiTokens.length * 3 + // color + dark + bg
    radiusTokens.length +
    shadowTokens.length +
    animationTokens.length +
    utilityTokens.length;

  return (
    <div className="w-full pb-16 space-y-8">
      {/* -- Header -- */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-4xl text-foreground">Design Tokens</h1>
          <Badge variant="outline" className="text-xs">v2.0.0</Badge>
          <Badge variant="default">{totalTokens}+ tokens</Badge>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Single source of truth for all CSS custom properties. Token values come from{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">/styles/themes/cesionbnk.css</code>. Toggle dark mode to see live values update.
        </p>
        <div className="flex gap-4 text-xs text-muted-foreground flex-wrap">
          <span>
            <span className="inline-block size-2.5 .5 rounded-full mr-1 align-middle bg-primary" />
            <strong className="text-foreground">Primary:</strong> #374151
          </span>
          <span>
            <span className="inline-block size-2.5 .5 rounded-full mr-1 align-middle bg-secondary" />
            <strong className="text-foreground">Secondary:</strong> #796eff
          </span>
          <span>
            <strong className="text-foreground">Font:</strong> {fontInfo.name}
          </span>
          <span>
            <strong className="text-foreground">Radius:</strong> var(--radius)
          </span>
          <span>
            {colorMode === "dark" ? <Moon className="size-3 inline mr-1" /> : <Sun className="size-3 inline mr-1" />}
            <strong className="text-foreground">Mode:</strong> {colorMode}
          </span>
        </div>
      </div>

      {/* Tenant Banner */}
      <TenantBanner />

      <Separator />

      {/* -- Tabs -- */}
      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="shape">Shape</TabsTrigger>
          <TabsTrigger value="shadows">Shadows</TabsTrigger>
          <TabsTrigger value="motion">Motion</TabsTrigger>
          <TabsTrigger value="breakpoints">Breakpoints</TabsTrigger>
          <TabsTrigger value="animations">Animations</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
        </TabsList>

        <TabsContent value="colors"><ColorsTab /></TabsContent>
        <TabsContent value="typography"><TypographyTab /></TabsContent>
        <TabsContent value="spacing"><SpacingTab /></TabsContent>
        <TabsContent value="shape"><ShapeTab /></TabsContent>
        <TabsContent value="shadows"><ShadowsTab /></TabsContent>
        <TabsContent value="motion"><MotionTab /></TabsContent>
        <TabsContent value="breakpoints"><BreakpointsTab /></TabsContent>
        <TabsContent value="animations"><AnimationsTab /></TabsContent>
        <TabsContent value="utilities"><UtilitiesTab /></TabsContent>
      </Tabs>
    </div>
  );
}