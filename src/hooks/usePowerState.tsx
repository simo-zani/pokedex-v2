import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

const STORAGE_KEY = "pokedex_power_state";
const SESSION_BOOT_KEY = "pokedex_has_booted";

interface PowerContextValue {
  isPowered: boolean;
  isBooting: boolean;
  isShuttingDown: boolean;
  togglePower: () => void;
  onBootComplete: () => void;
  onShutdownComplete: () => void;
}

const PowerContext = createContext<PowerContextValue | null>(null);

function readStoredPower(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored !== null ? JSON.parse(stored) === true : true;
  } catch {
    return true;
  }
}

function hasBootedThisSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_BOOT_KEY) === "true";
  } catch {
    return false;
  }
}

function markBootedThisSession(): void {
  try {
    sessionStorage.setItem(SESSION_BOOT_KEY, "true");
  } catch {
    // ignore
  }
}

export function PowerProvider({ children }: { children: ReactNode }) {
  const storedPower = readStoredPower();
  const alreadyBooted = hasBootedThisSession();

  const [isPowered, setIsPowered] = useState(
    storedPower && !alreadyBooted ? false : storedPower
  );
  const [isBooting, setIsBooting] = useState(
    storedPower && !alreadyBooted
  );
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isPowered));
  }, [isPowered]);

  useEffect(() => {
    if (storedPower && !alreadyBooted) {
      setIsBooting(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBootComplete = useCallback(() => {
    setIsBooting(false);
    setIsPowered(true);
    markBootedThisSession();
  }, []);

  const onShutdownComplete = useCallback(() => {
    setIsShuttingDown(false);
    setIsPowered(false);
  }, []);

  const togglePower = useCallback(() => {
    if (isBooting || isShuttingDown) return;

    if (isPowered) {
      setIsShuttingDown(true);
    } else {
      setIsBooting(true);
    }
  }, [isPowered, isBooting, isShuttingDown]);

  return (
    <PowerContext.Provider
      value={{
        isPowered,
        isBooting,
        isShuttingDown,
        togglePower,
        onBootComplete,
        onShutdownComplete,
      }}
    >
      {children}
    </PowerContext.Provider>
  );
}

export function usePowerState(): PowerContextValue {
  const ctx = useContext(PowerContext);
  if (!ctx) throw new Error("usePowerState must be used inside PowerProvider");
  return ctx;
}
