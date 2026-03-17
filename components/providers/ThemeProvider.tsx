import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

/**
 * THEME PROVIDER — Dark Mode only (Single tenant: CESIONBNK)
 *
 * v3.0.0 — Simplified to single tenant (CESIONBNK).
 * Only manages light/dark color mode toggle.
 * Token values live in /styles/themes/cesionbnk.css using :root / .dark selectors.
 */

/* ── Types ── */

export type ColorMode = "light" | "dark";

/* ── Context ── */

interface ThemeContextType {
  colorMode:       ColorMode;
  toggleColorMode: () => void;
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

  /* ── Sync color mode → <html class="dark"> ── */
  useEffect(() => {
    localStorage.setItem("theme", colorMode);
    document.documentElement.classList.toggle("dark", colorMode === "dark");
    // Ensure no stale data-theme attribute
    document.documentElement.removeAttribute("data-theme");
  }, [colorMode]);

  const toggleColorMode = useCallback(() =>
    setColorMode((prev) => (prev === "light" ? "dark" : "light")),
  []);

  return (
    <ThemeContext.Provider
      value={{
        colorMode,
        toggleColorMode,
        theme:           colorMode,
        toggleTheme:     toggleColorMode,
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
