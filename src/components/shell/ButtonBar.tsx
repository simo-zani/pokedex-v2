import { useNavigate, useParams, useLocation } from "react-router-dom";
import { usePowerState } from "../../hooks/usePowerState";
import { useTheme } from "../../hooks/useTheme";
import { POKEMON_LIST_LIMIT } from "../../lib/constants";

function ShellButton({
  label,
  sublabel,
  onClick,
  disabled = false,
  isRetro = true,
}: {
  label: string;
  sublabel?: string;
  onClick?: () => void;
  disabled?: boolean;
  isRetro?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex flex-col items-center justify-center
        transition-all duration-300
        ${
          isRetro
            ? `w-12 h-12 rounded-none
               border-2 border-gray-900 bg-gray-700
               text-gb-lightest text-xs font-retro
               shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4),0_2px_4px_rgba(0,0,0,0.3)]
               active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]
               [transition:all_0.1s_steps(3,end)]`
            : `w-11 h-11 rounded-xl
               border border-white/20 bg-white/15
               text-white text-xs
               shadow-[0_2px_8px_rgba(0,0,0,0.15)]
               active:bg-white/25 active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]
               backdrop-blur-sm`
        }
        ${disabled ? "opacity-40 cursor-default" : "cursor-pointer"}
        ${!disabled && isRetro ? "hover:bg-gray-600" : ""}
        ${!disabled && !isRetro ? "hover:bg-white/25" : ""}
      `}
    >
      <span className={isRetro ? "text-base leading-none" : "text-sm leading-none"}>{label}</span>
      {sublabel && (
        <span className={`mt-0.5 leading-none ${
          isRetro
            ? "text-[6px] text-gray-400 font-retro"
            : "text-[7px] text-white/60"
        }`}>
          {sublabel}
        </span>
      )}
    </button>
  );
}

export default function ButtonBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const { isPowered, isBooting, isShuttingDown } = usePowerState();
  const { isRetro, toggleTheme } = useTheme();

  const disabled = !isPowered || isBooting || isShuttingDown;
  const isDetail = location.pathname.startsWith("/pokemon/");
  const currentId = params.id ? parseInt(params.id, 10) : null;

  const canPrev = isDetail && currentId !== null && currentId > 1;
  const canNext = isDetail && currentId !== null && currentId < POKEMON_LIST_LIMIT;

  return (
    <div className={`
      flex items-center justify-center gap-3 px-4 py-4
      ${disabled ? "pointer-events-none" : ""}
    `}>
      <ShellButton
        label="◀"
        onClick={() => canPrev && navigate(`/pokemon/${currentId! - 1}`)}
        disabled={disabled || !canPrev}
        isRetro={isRetro}
      />
      <ShellButton
        label="▶"
        onClick={() => canNext && navigate(`/pokemon/${currentId! + 1}`)}
        disabled={disabled || !canNext}
        isRetro={isRetro}
      />
      <ShellButton
        label="⌂"
        sublabel="HOME"
        onClick={() => {
          navigate("/");
          document.getElementById("screen-scroll-container")?.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={disabled}
        isRetro={isRetro}
      />
      <ShellButton
        label="⟳"
        sublabel="MODE"
        onClick={toggleTheme}
        disabled={disabled}
        isRetro={isRetro}
      />
      <ShellButton label="G" sublabel="GEN" disabled={true} isRetro={isRetro} />
    </div>
  );
}
