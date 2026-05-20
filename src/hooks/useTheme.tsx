import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export type ThemeMode = "retro" | "modern";

interface ThemeContextValue {
  theme: ThemeMode;
  isRetro: boolean;
  toggleTheme: () => void;
}

const STORAGE_KEY = "pokedex_theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "modern" ? "modern" : "retro";
  } catch {
    return "retro";
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(readStoredTheme);

  // Sync data-theme attribute on <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "retro" ? "modern" : "retro"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isRetro: theme === "retro", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
