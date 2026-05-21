import { STAT_LABELS } from "../../lib/constants";
import StatBar from "./StatBar";

interface StatsPanelProps {
  stats: { base_stat: number; stat: { name: string } }[];
  isRetro: boolean;
  pokemonId: number;
}

export default function StatsPanel({ stats, isRetro, pokemonId }: StatsPanelProps) {
  const total = stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <div className="p-3" key={pokemonId}>
      <h2 className={`mb-3 uppercase tracking-wider ${
        isRetro
          ? "text-[8px] font-retro text-gb-darkest"
          : "text-base font-modern text-gray-600"
      }`}>
        {isRetro ? "STATISTICHE" : "Statistiche"}
      </h2>
      <div className="space-y-2">
        {stats.map((s) => (
          <StatBar
            key={s.stat.name}
            label={STAT_LABELS[s.stat.name] ?? s.stat.name}
            value={s.base_stat}
            isRetro={isRetro}
          />
        ))}
      </div>
      <div className={`mt-3 pt-2 border-t flex justify-between items-center ${
        isRetro ? "border-gb-dark" : "border-gray-200"
      }`}>
        <span className={isRetro ? "text-[7px] font-retro text-gb-darkest" : "text-sm font-modern text-gray-600 font-semibold"}>
          {isRetro ? "TOTALE" : "Total"}
        </span>
        <span className={isRetro ? "text-[8px] font-retro text-gb-darkest font-bold" : "text-sm font-modern text-gray-800 font-bold"}>
          {total}
        </span>
      </div>
    </div>
  );
}
