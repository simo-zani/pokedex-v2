import { usePowerState } from "../../hooks/usePowerState";
import { useTheme } from "../../hooks/useTheme";

export default function PowerButton() {
  const { isPowered, isBooting, isShuttingDown, togglePower } = usePowerState();
  const { isRetro } = useTheme();
  const busy = isBooting || isShuttingDown;
  const on = isPowered || isBooting;

  return (
    <button
      onClick={togglePower}
      disabled={busy}
      className={`
        w-9 h-9 rounded-full flex items-center justify-center
        text-sm font-bold
        [transition:all_0.3s_ease]
        ${
          isRetro
            ? `border-2 border-gray-900 bg-gray-700 ${
                busy ? "cursor-wait" : "cursor-pointer hover:bg-gray-600"
              } ${
                on
                  ? "shadow-[0_4px_8px_rgba(0,0,0,0.5),0_2px_3px_rgba(0,0,0,0.4),inset_0_-2px_3px_rgba(255,255,255,0.08)]"
                  : "shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
              }`
            : `border border-white/25 bg-white/15 backdrop-blur-sm ${
                busy ? "cursor-wait" : "cursor-pointer hover:bg-white/25"
              } ${
                on
                  ? "shadow-[0_3px_8px_rgba(0,0,0,0.3)]"
                  : "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
              }`
        }
      `}
      aria-label="Power"
    >
      <span
        className={`leading-none [transition:all_0.3s_ease] ${
          on
            ? "text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.9)] drop-shadow-[0_0_12px_rgba(74,222,128,0.5)]"
            : isRetro ? "text-gray-500" : "text-white/40"
        }`}
      >
        ⏻
      </span>
    </button>
  );
}
