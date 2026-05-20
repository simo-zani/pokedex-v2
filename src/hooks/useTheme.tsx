import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

export type ThemeMode = "retro" | "modern";

interface ThemeContextValue {
  theme: ThemeMode;
  isRetro: boolean;
  isGlitching: boolean;
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
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (isGlitching) return;

    if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);

    setIsGlitching(true);
    glitchTimerRef.current = setTimeout(() => {
      setTheme((prev) => (prev === "retro" ? "modern" : "retro"));
      glitchTimerRef.current = setTimeout(() => {
        setIsGlitching(false);
      }, 200);
    }, 150);
  }, [isGlitching]);

  return (
    <ThemeContext.Provider value={{ theme, isRetro: theme === "retro", isGlitching, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
