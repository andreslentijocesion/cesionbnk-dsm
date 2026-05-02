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
}

export const DESIGN_THEMES: ThemeConfig[] = [
  {
    id:          "cesionbnk",
    label:       "CesionBNK",
    description: "Identidad corporativa — gris, morado, Gotham",
  },
  {
    id:          "linear",
    label:       "Linear",
    description: "Productividad — violeta, compacto, Inter",
  },
  {
    id:          "stripe",
    label:       "Stripe",
    description: "Fintech estándar — índigo, sombras suaves",
  },
  {
    id:          "vercel",
    label:       "Vercel",
    description: "Minimalismo absoluto — negro/blanco, sin decoración",
  },
  {
    id:          "apple",
    label:       "Apple",
    description: "HIG — azul sistema, radios grandes, capas superficies",
  },
  {
    id:          "duotone",
    label:       "Duotone",
    description: "CESIONBNK dual — lavanda + blanco, violeta protagonista",
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
  if (context === undefined) {
    // Return a safe dummy context for Storybook/isolated usage
    return {
      colorMode: "light" as ColorMode,
      toggleColorMode: () => {},
      designTheme: "cesionbnk" as DesignTheme,
      setDesignTheme: () => {},
      theme: "light" as ColorMode,
      toggleTheme: () => {},
    };
  }
  return context;
}
