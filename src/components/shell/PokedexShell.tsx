import { type ReactNode } from "react";
import { usePowerState } from "../../hooks/usePowerState";
import { useTheme } from "../../hooks/useTheme";
import LedIndicator from "./LedIndicator";
import PowerButton from "./PowerButton";
import ScreenArea from "./ScreenArea";
import ButtonBar from "./ButtonBar";

interface PokedexShellProps {
  children: ReactNode;
}

export default function PokedexShell({ children }: PokedexShellProps) {
  const { isPowered, isBooting } = usePowerState();
  const { isRetro } = useTheme();

  return (
    <div className="h-[100dvh] md:h-[100vh] overflow-hidden bg-gray-200 flex items-center justify-center">
      <div
        className={`
          w-full h-full flex flex-col overflow-hidden
          md:max-w-[480px]
          transition-all duration-500 ease-in-out
          ${
            isRetro
              ? `bg-[#8B8B8B]
                 md:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_2px_0_rgba(255,255,255,0.15)]`
              : `bg-gradient-to-b from-[#DC0A2D] via-[#C50926] to-[#A3071F]
                 md:shadow-[0_8px_40px_rgba(220,10,45,0.3),0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]`
          }
        `}
      >
        {/* Header: LED — Title — Power */}
        <div className="flex items-center justify-between px-5 py-3 shrink-0">
          <LedIndicator isOn={isPowered || isBooting} />
          <h1 className={`font-bold uppercase select-none transition-all duration-500 ${
            isRetro
              ? "text-white text-sm tracking-widest"
              : "text-white/95 text-sm tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          }`}>
            Pokédex
          </h1>
          <PowerButton />
        </div>

        {/* Decorative line — modern only */}
        <div className={`mx-4 h-px transition-opacity duration-500 ${
          isRetro
            ? "opacity-0"
            : "opacity-100 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        }`} />

        {/* Screen — takes all remaining space */}
        <ScreenArea>{children}</ScreenArea>

        {/* Buttons — pinned at bottom */}
        <div className="shrink-0">
          <ButtonBar />
        </div>
      </div>
    </div>
  );
}
