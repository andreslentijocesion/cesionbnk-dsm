/**
 * CESIONBNK Design System — Brand Constants
 * 
 * Central source of truth for brand-related strings and values.
 */

export const BRAND_INFO = {
  name: "CESIONBNK",
  primaryColor: "#374151", // Gray / Slate
  secondaryColor: "#796eff", // Purple / Violet
  fontFamily: "Gotham",
  borderRadius: "0.625rem", // 10px
  baseSpacing: 4,
};

export const BRAND_COLORS = [
  { 
    id: "primary", 
    name: "Primary", 
    hex: BRAND_INFO.primaryColor, 
    rgb: "rgb(55, 65, 81)", 
    usage: "CTAs, active states, focus rings", 
    contrast: "WCAG AA (4.6:1 over white)" 
  },
  { 
    id: "secondary", 
    name: "Secondary", 
    hex: BRAND_INFO.secondaryColor, 
    rgb: "rgb(121, 110, 255)", 
    usage: "Accents, links, highlights", 
    contrast: "WCAG AA (3.5:1 over white)" 
  },
];

export const SPACING_SCALE = [
  { name: "xs", value: "4px", multiplier: "1x" },
  { name: "sm", value: "8px", multiplier: "2x" },
  { name: "md", value: "12px", multiplier: "3x" },
  { name: "base", value: "16px", multiplier: "4x" },
  { name: "lg", value: "24px", multiplier: "6x" },
  { name: "xl", value: "32px", multiplier: "8x" },
  { name: "2xl", value: "48px", multiplier: "12x" },
  { name: "3xl", value: "64px", multiplier: "16x" },
];
