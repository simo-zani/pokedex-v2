import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePokemon, usePokemonSpecies } from "../hooks/usePokemon";
import { useTheme } from "../hooks/useTheme";
import { formatPokemonNumber, STAT_LABELS, POKEMON_LIST_LIMIT } from "../lib/constants";
import LoadingScreen from "../components/common/LoadingScreen";
import ErrorMessage from "../components/common/ErrorMessage";
import SpriteImage from "../components/common/SpriteImage";

/* Pokémon type → color for modern mode */
const TYPE_COLORS: Record<string, string> = {
  normal: "bg-gray-400", fire: "bg-orange-500", water: "bg-blue-500",
  electric: "bg-yellow-400", grass: "bg-green-500", ice: "bg-cyan-300",
  fighting: "bg-red-700", poison: "bg-purple-500", ground: "bg-amber-600",
  flying: "bg-indigo-300", psychic: "bg-pink-500", bug: "bg-lime-500",
  rock: "bg-yellow-700", ghost: "bg-purple-700", dragon: "bg-indigo-600",
  dark: "bg-gray-700", steel: "bg-gray-400", fairy: "bg-pink-300",
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

  return (
    <div className={`px-4 py-4 min-h-full transition-colors duration-500 ${
      isRetro ? "bg-gb-bg" : "bg-white"
    }`}>
      {/* Header */}
      <div className="relative text-center flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className={`absolute left-0 p-1 rounded transition-colors ${
            isRetro
              ? "text-gb-darkest hover:bg-gb-light"
              : "text-gray-600 hover:bg-gray-100"
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
            : "text-xs text-gray-400 font-medium"
          }>
            {formatPokemonNumber(pokemon.id)}
          </p>
          <h1 className={`capitalize mt-1 leading-tight ${
            isRetro
              ? "text-[12px] font-retro text-gb-darkest"
              : "text-xl font-bold text-gray-900"
          }`}>{englishName}</h1>
        </div>
      </div>

      {/* Sprite */}
      <div className={`flex justify-center my-4 mx-auto ${
        isRetro ? "p-2 w-32 h-32" : "p-4 w-40 h-40"
      }`}>
        <SpriteImage
          pokemonId={pokemon.id}
          sprites={pokemon.sprites}
          alt={englishName}
          width={isRetro ? 96 : 128}
          height={isRetro ? 96 : 128}
          className="w-full h-full object-contain"
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
                : `${TYPE_COLORS[t.type.name] || "bg-gray-400"} text-white text-[11px] font-semibold rounded-full px-3 py-1`
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
          : "text-sm text-gray-500"
      }`}>
        <span>{isRetro ? "HT" : "Height"}: {(pokemon.height / 10).toFixed(1)}m</span>
        <span>{isRetro ? "WT" : "Weight"}: {(pokemon.weight / 10).toFixed(1)}kg</span>
      </div>

      {/* Stats */}
      <div className="p-3">
        <h2 className={`mb-3 uppercase tracking-wider ${
          isRetro
            ? "text-[8px] font-retro text-gb-darkest"
            : "text-xs font-semibold text-gray-700"
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
                <span className="text-[11px] text-gray-500 w-12 text-right font-medium">{label}</span>
                <span className="text-[11px] text-gray-800 w-8 text-right font-bold">{s.base_stat}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColor} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
