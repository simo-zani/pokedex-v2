import { type ReactNode } from "react";
import { usePowerState } from "../../hooks/usePowerState";
import { useTheme } from "../../hooks/useTheme";
import ScreenOverlay from "./ScreenOverlay";

interface ScreenAreaProps {
  children: ReactNode;
}

export default function ScreenArea({ children }: ScreenAreaProps) {
  const { isPowered, isBooting } = usePowerState();
  const { isRetro, isGlitching } = useTheme();

  return (
    <div className={`relative overflow-hidden flex-1 flex flex-col transition-all duration-500 ${
      isRetro
        ? "mx-3 rounded-lg border-4 border-gb-darkest bg-gb-darkest"
        : "mx-3 rounded-2xl border-2 border-black/30 bg-gray-900"
    } ${isGlitching ? "crt-transition" : ""}`}>
      {/* Inner screen — fills all available height */}
      <div id="screen-scroll-container" className={`relative flex-1 overflow-y-auto no-scrollbar transition-colors duration-500 ${
        isRetro ? "bg-gb-bg" : "bg-white"
      }`}>
        <div className={`transition-opacity duration-300 ${
          isPowered && !isBooting ? "opacity-100" : "opacity-0"
        }`}>
          {children}
        </div>
      </div>

      {/* Retro effects: glow and scanlines */}
      <div className={`absolute inset-0 pointer-events-none z-10 gb-screen transition-opacity duration-500 ${
        isRetro ? "shadow-[inset_0_0_40px_var(--gb-dark)]" : "shadow-none"
      }`} />

      {/* Blank screen when off */}
      {!isPowered && !isBooting && (
        <div className={`absolute inset-0 pointer-events-none z-20 transition-colors duration-500 ${
          isRetro ? "bg-gb-darkest" : "bg-gray-900"
        }`} />
      )}

      {/* Boot/shutdown animation overlay */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <ScreenOverlay />
      </div>
    </div>
  );
}
