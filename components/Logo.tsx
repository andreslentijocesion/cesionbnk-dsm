/**
 * Logo — CESIONBNK Wordmark
 *
 * Renders the CESIONBNK brand logo using the Figma SVG import (svg-dxvtwld637).
 * Monocolor, variant-aware (light → secondary color, dark → white).
 *
 * Sizing: uses width="100%" + height="auto" so it scales
 * proportionally within the fixed-width container (sizeClasses).
 *
 * @version 3.0.0 — Single tenant (removed 4 unused tenant logos)
 */

import { cn } from "./ui/utils";
import { useTheme } from "./providers/ThemeProvider";
import svgCesionBnk from "../imports/svg-dxvtwld637";

/* ── Props ── */

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  /** "auto" detects from colorMode; "dark"/"light" forces a variant */
  variant?: "light" | "dark" | "auto";
}

/** Container width by size — SVG height auto-derives from viewBox ratio */
const sizeClasses: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "w-[77px]",   // 128 px → 77 px (−40 %)
  md: "w-[106px]",  // 176 px → 106 px (−40 %)
  lg: "w-[134px]",  // 224 px → 134 px (−40 %)
  xl: "w-[154px]",  // 256 px → 154 px (−40 %)
};

/* ── CESIONBNK wordmark ── */

/**
 * CESIONBNK wordmark (Figma import svg-dxvtwld637).
 * ViewBox 0 0 256 30.7575 → ratio ≈ 8.32 : 1
 * Light → var(--secondary) | Dark → white
 */
function CesionBnkLogoSVG({ variant }: { variant: "light" | "dark" }) {
  const fill = variant === "dark" ? "white" : "var(--secondary)";

  return (
    <svg
      fill="none"
      viewBox="0 0 256 30.7575"
      width="100%"
      height="auto"
      style={{ display: "block", "--fill-0": fill } as React.CSSProperties}
      aria-label="CESIONBNK"
    >
      <path d={svgCesionBnk.p2a738d80} fill="var(--fill-0, #212529)" /> {/* C */}
      <path d={svgCesionBnk.p301ad2e0} fill="var(--fill-0, #212529)" /> {/* E top */}
      <path d={svgCesionBnk.p12e48500} fill="var(--fill-0, #212529)" /> {/* E mid */}
      <path d={svgCesionBnk.p18eb5400} fill="var(--fill-0, #212529)" /> {/* E bot */}
      <path d={svgCesionBnk.pb23ef80}  fill="var(--fill-0, #212529)" /> {/* S */}
      <path d={svgCesionBnk.p3ee20600} fill="var(--fill-0, #212529)" /> {/* I */}
      <path d={svgCesionBnk.p32547c00} fill="var(--fill-0, #212529)" /> {/* O */}
      <path d={svgCesionBnk.p12b3b270} fill="var(--fill-0, #212529)" /> {/* N */}
      <path d={svgCesionBnk.p197eee00} fill="var(--fill-0, #212529)" /> {/* B */}
      <path d={svgCesionBnk.pe3a59f0}  fill="var(--fill-0, #212529)" /> {/* N */}
      <path d={svgCesionBnk.p2267b580} fill="var(--fill-0, #212529)" /> {/* K */}
    </svg>
  );
}

/* ── Main Logo component ── */

export function Logo({ className, size = "md", variant = "auto" }: LogoProps) {
  const { theme } = useTheme();

  const effectiveVariant: "light" | "dark" =
    variant === "auto" ? (theme === "dark" ? "dark" : "light") : variant;

  return (
    <div className={cn("inline-flex items-center shrink-0", sizeClasses[size], className)}>
      <CesionBnkLogoSVG variant={effectiveVariant} />
    </div>
  );
}
