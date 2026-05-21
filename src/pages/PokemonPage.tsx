import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePokemon, usePokemonSpecies } from "../hooks/usePokemon";
import { useTheme } from "../hooks/useTheme";
import { formatPokemonNumber, STAT_LABELS, POKEMON_LIST_LIMIT } from "../lib/constants";
import LoadingScreen from "../components/common/LoadingScreen";
import ErrorMessage from "../components/common/ErrorMessage";
import SpriteViewer from "../components/pokemon/SpriteViewer";
import { getAvailableGames, getDefaultRetroGame, type GameVersion } from "../lib/sprites";

/* Pokémon type → Tailwind bg class for badges */
const TYPE_COLORS: Record<string, string> = {
  normal: "bg-gray-400", fire: "bg-orange-500", water: "bg-blue-500",
  electric: "bg-yellow-400", grass: "bg-green-500", ice: "bg-cyan-300",
  fighting: "bg-red-700", poison: "bg-purple-500", ground: "bg-amber-600",
  flying: "bg-indigo-300", psychic: "bg-pink-500", bug: "bg-lime-500",
  rock: "bg-yellow-700", ghost: "bg-purple-700", dragon: "bg-indigo-600",
  dark: "bg-gray-700", steel: "bg-slate-400", fairy: "bg-pink-300",
};

/* Pokémon type → hex for background tint gradient */
const TYPE_HEX: Record<string, string> = {
  normal: "#A8A77A", fire: "#f97316", water: "#3b82f6",
  electric: "#facc15", grass: "#22c55e", ice: "#67e8f9",
  fighting: "#b91c1c", poison: "#a855f7", ground: "#d97706",
  flying: "#a5b4fc", psychic: "#ec4899", bug: "#84cc16",
  rock: "#a16207", ghost: "#7e22ce", dragon: "#4f46e5",
  dark: "#374151", steel: "#94a3b8", fairy: "#f9a8d4",
};

const STAT_COLORS: Record<string, string> = {
  hp: "bg-red-500", attack: "bg-orange-500", defense: "bg-yellow-500",
  "special-attack": "bg-blue-500", "special-defense": "bg-green-500", speed: "bg-pink-500",
};

export default function PokemonPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numId = id ? parseInt(id, 10) : null;
  const { isRetro } = useTheme();
  const [gameVersion, setGameVersion] = useState<GameVersion>("official-artwork");
  const [gameDropdownOpen, setGameDropdownOpen] = useState(false);

  const {
    data: pokemon,
    isLoading: loadingPokemon,
    isError: errorPokemon,
  } = usePokemon(id ?? "");

  const {
    data: species,
    isLoading: loadingSpecies,
    isError: errorSpecies,
  } = usePokemonSpecies(id ?? "");

  // Reset gameVersion when pokemon or theme changes
  useEffect(() => {
    if (pokemon) {
      setGameVersion(isRetro ? getDefaultRetroGame(pokemon.id) : "official-artwork");
    }
  }, [pokemon?.id, isRetro]);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!numId) return;
      if (e.key === "ArrowLeft" && numId > 1) navigate(`/pokemon/${numId - 1}`);
      else if (e.key === "ArrowRight" && numId < POKEMON_LIST_LIMIT) navigate(`/pokemon/${numId + 1}`);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [numId, navigate]);

  if (loadingPokemon || loadingSpecies) return <LoadingScreen />;
  if (errorPokemon || errorSpecies || !pokemon)
    return <ErrorMessage message="Errore caricamento Pokémon." />;

  const englishName =
    species?.names.find((n) => n.language.name === "en")?.name ?? pokemon.name;

  // Tinted background for modern mode based on types
  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const secondaryType = pokemon.types[1]?.type.name;
  const color1 = TYPE_HEX[primaryType] ?? "#9ca3af";
  const color2 = secondaryType ? (TYPE_HEX[secondaryType] ?? "#9ca3af") : null;

  const modernBg = isRetro
    ? undefined
    : color2
    ? {
        background: `radial-gradient(circle at 0% 0%, ${color1}55 0%, transparent 60%), radial-gradient(circle at 100% 0%, ${color2}55 0%, transparent 60%), #f9fafb`,
      }
    : {
        background: `radial-gradient(circle at 0% 0%, ${color1}77 0%, transparent 70%), #f9fafb`,
      };

  return (
    <div
      className={`relative overflow-hidden px-4 py-4 min-h-full transition-colors duration-500 ${
        isRetro ? "bg-gb-bg" : ""
      }`}
      style={modernBg}
    >
      <div className="relative z-10">
        {/* Header */}
      <div className="relative text-center flex items-center justify-center min-h-[48px]">
        <button
          onClick={() => navigate("/")}
          className={`absolute left-0 p-1.5 rounded-full transition-colors ${
            isRetro
              ? "text-gb-darkest hover:bg-gb-light"
              : "text-gray-600 hover:bg-white/60"
          }`}
          title="Torna alla lista"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <p className={isRetro
            ? "text-[8px] text-gb-dark font-retro"
            : "text-lg text-gray-400 font-modern tracking-wider"
          }>
            {formatPokemonNumber(pokemon.id)}
          </p>
          <h1 className={`capitalize mt-1 leading-tight ${
            isRetro
              ? "text-[12px] font-retro text-gb-darkest"
              : "text-4xl font-bold text-gray-900 font-modern"
          }`}>{englishName}</h1>
        </div>

        {!isRetro && getAvailableGames(pokemon, "modern").length > 0 && (
          <div className="absolute right-0 top-[6px]">
            <div className="relative inline-block text-left">
              <button
                onClick={() => setGameDropdownOpen((o) => !o)}
                className={`flex items-center justify-center p-1.5 rounded-full transition-all duration-200 ${
                  gameDropdownOpen
                    ? "text-orange-500 bg-orange-50/50 scale-105"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100/50"
                }`}
                title="Seleziona versione di gioco"
              >
                {/* Cute GameBoy Vector Icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <rect x="8" y="5" width="8" height="5" rx="0.5" />
                  <line x1="9.5" y1="14" x2="11.5" y2="14" strokeWidth="2" />
                  <line x1="10.5" y1="13" x2="10.5" y2="15" strokeWidth="2" />
                  <circle cx="15" cy="13.5" r="0.75" fill="currentColor" />
                  <circle cx="13.5" cy="14.5" r="0.75" fill="currentColor" />
                </svg>
              </button>

              {gameDropdownOpen && (
                <>
                  {/* Invisible backdrop to dismiss dropdown */}
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setGameDropdownOpen(false)}
                  />
                  {/* Premium Dropdown List */}
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl z-50 py-1.5 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                      Sprite di gioco
                    </div>
                    {getAvailableGames(pokemon, "modern").map((g) => {
                      const isSelected = gameVersion === g.key;
                      return (
                        <button
                          key={g.key}
                          onClick={() => {
                            setGameVersion(g.key);
                            setGameDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs font-semibold font-modern transition-colors flex items-center justify-between ${
                            isSelected
                              ? "bg-orange-50 text-orange-600 font-bold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span>{g.label}</span>
                          {isSelected && (
                            <svg className="w-3.5 h-3.5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sprite */}
      <div className="flex justify-center my-4 mx-auto w-full">
        <SpriteViewer 
          pokemon={pokemon}
          gameVersion={gameVersion}
          setGameVersion={setGameVersion}
        />
      </div>

      {/* Types */}
      <div className="flex justify-center gap-2 mb-3">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className={`px-2 py-0.5 capitalize ${
              isRetro
                ? "border border-gb-dark text-[8px] font-retro text-gb-darkest"
                : `${TYPE_COLORS[t.type.name] || "bg-gray-400"} text-white text-[13px] font-modern rounded-full px-3 py-1`
            }`}
          >
            {t.type.name}
          </span>
        ))}
      </div>

      {/* Physical info */}
      <div className={`flex justify-center gap-6 mb-4 ${
        isRetro
          ? "text-[8px] font-retro text-gb-dark"
          : "text-base font-modern text-gray-500"
      }`}>
        <span>{isRetro ? "HT" : "Height"}: {(pokemon.height / 10).toFixed(1)}m</span>
        <span>{isRetro ? "WT" : "Weight"}: {(pokemon.weight / 10).toFixed(1)}kg</span>
      </div>

      {/* Stats */}
      <div className="p-3">
        <h2 className={`mb-3 uppercase tracking-wider ${
          isRetro
            ? "text-[8px] font-retro text-gb-darkest"
            : "text-base font-modern text-gray-600"
        }`}>
          {isRetro ? "STATISTICHE" : "Stats"}
        </h2>
        <div className="space-y-2">
          {pokemon.stats.map((s) => {
            const label = STAT_LABELS[s.stat.name] ?? s.stat.name;
            const maxVal = 255;

            if (isRetro) {
              const segments = Math.max(1, Math.round((s.base_stat / maxVal) * 15));
              return (
                <div key={s.stat.name} className="flex items-center gap-2">
                  <span className="text-[7px] font-retro text-gb-dark w-12 text-right uppercase">{label}</span>
                  <span className="text-[7px] font-retro text-gb-darkest w-8 text-right font-bold">{s.base_stat}</span>
                  <div className="flex-1 flex gap-0.5 h-2 bg-gb-lightest/40 border border-gb-darkest p-[1px]">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div key={i} className={`flex-1 h-full ${i < segments ? "bg-gb-darkest" : "bg-transparent"}`} />
                    ))}
                  </div>
                </div>
              );
            }

            // Modern stat bar
            const pct = Math.min((s.base_stat / maxVal) * 100, 100);
            const barColor = STAT_COLORS[s.stat.name] || "bg-gray-400";
            return (
              <div key={s.stat.name} className="flex items-center gap-2">
                <span className="text-[13px] font-modern text-gray-500 w-14 text-right">{label}</span>
                <span className="text-[13px] font-modern text-gray-800 font-bold w-8 text-right">{s.base_stat}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColor} transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}
