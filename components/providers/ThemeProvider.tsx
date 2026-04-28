import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

/**
 * THEME PROVIDER — Dark Mode + Design Theme
 *
 * v4.0.0 — Multi-theme support.
 * Manages:
 *   - colorMode: light | dark  → adds/removes .dark on <html>
 *   - designTheme: cesionbnk | linear | stripe | vercel | apple
 *     → sets/removes data-theme="..." on <html>
 *     cesionbnk = default (no data-theme attribute, uses :root)
 */

/* ── Types ── */

export type ColorMode = "light" | "dark";

export type DesignTheme = "cesionbnk" | "linear" | "stripe" | "vercel" | "apple" | "duotone";

export interface ThemeConfig {
  id:          DesignTheme;
  label:       string;
  description: string;
  primary:     string;
  background:  string;
  card:        string;
  accent:      string;
}

export const DESIGN_THEMES: ThemeConfig[] = [
  {
    id:          "cesionbnk",
    label:       "CesionBNK",
    description: "Identidad corporativa — gris, morado, Gotham",
    primary:     "#374151",
    background:  "#ffffff",
    card:        "#ffffff",
    accent:      "#796eff",
  },
  {
    id:          "linear",
    label:       "Linear",
    description: "Productividad — violeta, compacto, Inter",
    primary:     "#7c3aed",
    background:  "#f9f9fb",
    card:        "#ffffff",
    accent:      "#a78bfa",
  },
  {
    id:          "stripe",
    label:       "Stripe",
    description: "Fintech estándar — índigo, sombras suaves",
    primary:     "#635bff",
    background:  "#ffffff",
    card:        "#ffffff",
    accent:      "#0a2540",
  },
  {
    id:          "vercel",
    label:       "Vercel",
    description: "Minimalismo absoluto — negro/blanco, sin decoración",
    primary:     "#171717",
    background:  "#ffffff",
    card:        "#ffffff",
    accent:      "#444444",
  },
  {
    id:          "apple",
    label:       "Apple",
    description: "HIG — azul sistema, radios grandes, capas superficies",
    primary:     "#007aff",
    background:  "#f2f2f7",
    card:        "#ffffff",
    accent:      "#5856d6",
  },
  {
    id:          "duotone",
    label:       "Duotone",
    description: "CESIONBNK dual — lavanda + blanco, violeta protagonista",
    primary:     "#5b4fdf",
    background:  "#f5f3ff",
    card:        "#ffffff",
    accent:      "#796eff",
  },
];

/* ── Context ── */

interface ThemeContextType {
  colorMode:       ColorMode;
  toggleColorMode: () => void;
  designTheme:     DesignTheme;
  setDesignTheme:  (theme: DesignTheme) => void;
  /** Aliases for backward compat */
  theme:           ColorMode;
  toggleTheme:     () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/* ── Provider ── */

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  const [designTheme, setDesignThemeState] = useState<DesignTheme>(() => {
    const saved = localStorage.getItem("design-theme");
    const valid: DesignTheme[] = ["cesionbnk", "linear", "stripe", "vercel", "apple", "duotone"];
    return valid.includes(saved as DesignTheme) ? (saved as DesignTheme) : "cesionbnk";
  });

  /* ── Sync color mode → <html class="dark"> ── */
  useEffect(() => {
    localStorage.setItem("theme", colorMode);
    document.documentElement.classList.toggle("dark", colorMode === "dark");
  }, [colorMode]);

  /* ── Sync design theme → <html data-theme="..."> ── */
  useEffect(() => {
    localStorage.setItem("design-theme", designTheme);
    if (designTheme === "cesionbnk") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", designTheme);
    }
  }, [designTheme]);

  const toggleColorMode = useCallback(() =>
    setColorMode((prev) => (prev === "light" ? "dark" : "light")),
  []);

  const setDesignTheme = useCallback((theme: DesignTheme) => {
    setDesignThemeState(theme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        colorMode,
        toggleColorMode,
        designTheme,
        setDesignTheme,
        theme:       colorMode,
        toggleTheme: toggleColorMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/* ── Hook ── */

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
