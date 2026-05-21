import type { EvolutionDetail } from "../../lib/types";
import { formatEvolutionCondition, getItemSpriteUrl } from "../../lib/evolution";

interface EvolutionArrowProps {
  details: EvolutionDetail[];
  isRetro: boolean;
}

export default function EvolutionArrow({ details, isRetro }: EvolutionArrowProps) {
  const conditions = formatEvolutionCondition(details);

  return (
    <div className="flex flex-col items-center justify-center gap-1 px-2">
      <svg className={`${isRetro ? "w-4 h-4" : "w-5 h-5"} ${isRetro ? "text-gb-dark" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M15 6l6 6-6 6" />
      </svg>
      {conditions.map((c, i) => (
        <div key={i} className="flex items-center gap-1">
          {!isRetro && c.icon && <span className="text-[10px]">{c.icon}</span>}
          {!isRetro && c.itemName && (
            <img src={getItemSpriteUrl(c.itemName)} alt="" className="w-4 h-4 object-contain" />
          )}
          <span className={`whitespace-nowrap ${
            isRetro ? "text-[6px] font-retro text-gb-darkest" : "text-[9px] font-modern text-gray-500"
          }`}>
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
}
