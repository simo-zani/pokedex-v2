import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePokemon, usePokemonSpecies } from "../hooks/usePokemon";
import { useTheme } from "../hooks/useTheme";
import { useLanguage, getLocalizedName, LANGUAGES, type LanguageCode } from "../hooks/useLanguage";
import { formatPokemonNumber, POKEMON_LIST_LIMIT } from "../lib/constants";
import LoadingScreen from "../components/common/LoadingScreen";
import ErrorMessage from "../components/common/ErrorMessage";
import SpriteViewer from "../components/pokemon/SpriteViewer";
import StatsPanel from "../components/pokemon/StatsPanel";
import EvolutionChain from "../components/pokemon/EvolutionChain";
import FlavorTextPopup, { getFlavorTextEntry } from "../components/pokemon/FlavorText";
import { useEvolutionChain } from "../hooks/useEvolutionChain";
import { getAvailableGames, getDefaultRetroGame, getSpriteUrl, hasGenderForGame, type GameVersion } from "../lib/sprites";

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

export default function PokemonPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numId = id ? parseInt(id, 10) : null;
  const { isRetro } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [gameVersion, setGameVersion] = useState<GameVersion>("official-artwork");
  const [gameDropdownOpen, setGameDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [flavorOpen, setFlavorOpen] = useState(false);
  const [shiny, setShiny] = useState(false);
  const [gender, setGender] = useState<"male" | "female">("male");

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

  const { data: evolutionData } = useEvolutionChain(species?.evolution_chain?.url);

  // Reset shiny/gender on pokemon change
  useEffect(() => {
    setShiny(false);
    setGender("male");
  }, [pokemon?.id]);

  const hasFlavorText = species && pokemon
    ? getFlavorTextEntry(species, language, gameVersion, isRetro, pokemon.id) !== null
    : false;

  // Shiny / gender helpers
  const normalUrl = pokemon ? getSpriteUrl(pokemon, { view: "front", shiny: false, gender, gameVersion }) : null;
  const shinyUrl = pokemon ? getSpriteUrl(pokemon, { view: "front", shiny: true, gender, gameVersion }) : null;
  const hasShinyVariant = !!shinyUrl && shinyUrl !== normalUrl;
  const showGenderSelect = pokemon ? hasGenderForGame(pokemon, gameVersion) : false;

  // Turn off shiny if game doesn't support it
  useEffect(() => {
    if (!hasShinyVariant) setShiny(false);
  }, [gameVersion, hasShinyVariant]);

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

  const displayName = getLocalizedName(species, language) ?? pokemon.name;

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
            }`}>{displayName}</h1>
          </div>
        </div>

        {/* Right column: gameboy, flag, info, shiny, gender */}
        <div className="absolute right-0 top-0 flex flex-col items-center gap-3 pointer-events-none z-10">
          {/* GameBoy */}
          {!isRetro && getAvailableGames(pokemon, "modern").length > 0 && (
            <div className="relative pointer-events-auto">
              <button
                onClick={() => setGameDropdownOpen((o) => !o)}
                className={`flex items-center justify-center w-[25px] h-[25px] rounded-full ${
                  gameDropdownOpen ? "text-orange-500" : "text-gray-400"
                }`}
                title="Seleziona versione di gioco"
              >
                <svg viewBox="0 0 24 24" className="w-[25px] h-[25px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <rect x="8" y="5" width="8" height="5" rx="0.5" />
                  <line x1="9.5" y1="14" x2="11.5" y2="14" strokeWidth="1.5" />
                  <line x1="10.5" y1="13" x2="10.5" y2="15" strokeWidth="1.5" />
                  <circle cx="15" cy="13.5" r="0.75" fill="currentColor" />
                  <circle cx="13.5" cy="14.5" r="0.75" fill="currentColor" />
                </svg>
              </button>
              {gameDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setGameDropdownOpen(false)} />
                  <div className="absolute right-0 mt-1 w-48 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl z-50 py-1.5 max-h-60 overflow-y-auto">
                    <div className="px-3 py-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                      Sprite di gioco
                    </div>
                    {getAvailableGames(pokemon, "modern").map((g) => {
                      const isSelected = gameVersion === g.key;
                      return (
                        <button
                          key={g.key}
                          onClick={() => { setGameVersion(g.key); setGameDropdownOpen(false); }}
                          className={`w-full text-left px-3 py-1.5 text-xs font-semibold font-modern flex items-center justify-between ${
                            isSelected
                              ? "bg-orange-50 text-orange-600 font-bold"
                              : "text-gray-700"
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
          )}

          {/* Language flag */}
          <div className={`relative pointer-events-auto ${isRetro ? "" : ""}`}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              className={`flex items-center justify-center ${
                isRetro
                  ? "text-[13px] font-retro text-gb-dark"
                  : "rounded-full w-[25px] h-[25px] text-gray-400"
              }`}
              title="Cambia lingua"
            >
              {(() => {
                const lang = LANGUAGES.find((l) => l.code === language);
                if (isRetro) {
                  return <span className="font-bold">{language.toUpperCase().slice(0, 2)}</span>;
                }
                return lang?.countryCode
                  ? <img src={`https://flagcdn.com/w80/${lang.countryCode}.png`} className="w-[25px] h-[25px] rounded-full object-cover" alt="" />
                  : <span className="text-[9px]">{language.toUpperCase().slice(0, 2)}</span>;
              })()}
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div className={`absolute right-0 mt-1 w-36 z-50 rounded-2xl shadow-xl border py-1 max-h-60 overflow-y-auto ${
                  isRetro ? "bg-gb-bg border-gb-dark" : "bg-white/95 backdrop-blur-md border-gray-100"
                }`}>
                  {LANGUAGES.map((l) => {
                    const isSelected = language === l.code;
                    return (
                      <button
                        key={l.code}
                        onClick={() => { setLanguage(l.code as LanguageCode); setLangOpen(false); }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 ${
                          isSelected
                            ? isRetro ? "bg-gb-darkest text-gb-lightest" : "bg-orange-50 text-orange-600 font-bold"
                            : isRetro ? "text-gb-darkest" : "text-gray-700"
                        }`}
                      >
                        {isRetro ? (
                          <span className="text-[9px] font-bold w-5 text-center">{l.code.toUpperCase().slice(0, 2)}</span>
                        ) : (
                          <img src={`https://flagcdn.com/w80/${l.countryCode}.png`} className="w-4 h-4 rounded-sm object-cover" alt="" />
                        )}
                        <span className={isRetro ? "font-retro text-[8px]" : "font-modern text-[11px]"}>{l.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Info (i) */}
          {hasFlavorText && (
            <div className="pointer-events-auto">
              <button
                onClick={() => setFlavorOpen(true)}
                className={`flex items-center justify-center ${
                  isRetro
                    ? "text-[13px] font-retro text-gb-dark"
                    : "rounded-full w-[25px] h-[25px] text-base font-bold border-[1.5px] border-gray-400 text-gray-400"
                }`}
                title="Descrizione Pokédex"
              >
                i
              </button>
            </div>
          )}

          {/* Shiny */}
          {hasShinyVariant && (
            <div className="pointer-events-auto">
              <button
                onClick={() => setShiny((s) => !s)}
                className={`flex items-center justify-center w-[25px] h-[25px] ${
                  isRetro
                    ? "w-[25px] h-[25px]"
                    : "w-[25px] h-[25px]"
                } ${
                  isRetro
                    ? shiny ? "text-gb-darkest" : "text-gb-dark"
                    : shiny ? "text-yellow-400" : "text-gray-400"
                }`}
                title={shiny ? "Rendi normale" : "Rendi shiny"}
              >
                <svg viewBox="0 0 32 32" className="w-[25px] h-[25px] select-none" fill={shiny ? (isRetro ? "#0F380F" : "#facc15") : "none"} stroke={isRetro ? (shiny ? "#0F380F" : "#306230") : "#9ca3af"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 16 7 Q 16 16 25 16 Q 16 16 16 25 Q 16 16 7 16 Q 16 16 16 7" />
                  <path d="M 7 2 Q 7 7 12 7 Q 7 7 7 12 Q 7 7 2 7 Q 7 7 7 2" />
                  <path d="M 26 5.5 Q 26 9 29.5 9 Q 26 9 26 12.5 Q 26 9 22.5 9 Q 26 9 26 5.5" />
                  <path d="M 22 25 Q 22 28.5 25.5 28.5 Q 22 28.5 22 32 Q 22 28.5 18.5 28.5 Q 22 28.5 22 25" />
                </svg>
              </button>
            </div>
          )}

          {/* Gender ♂ / ♀ */}
          {showGenderSelect && (
            <div className="flex flex-col items-center pointer-events-auto gap-0.5">
              <button
                onClick={() => setGender("male")}
                className={`bg-transparent border-0 p-0 cursor-pointer leading-none ${
                  isRetro
                    ? gender === "male" ? "text-gb-darkest" : "text-gb-dark"
                    : gender === "male" ? "text-blue-500" : "text-gray-300"
                } text-[25px]`}
                style={{ WebkitTextStroke: "1px currentColor", textShadow: "0 0 0 currentColor" }}
              >
                ♂
              </button>
              <button
                onClick={() => setGender("female")}
                className={`bg-transparent border-0 p-0 cursor-pointer leading-none ${
                  isRetro
                    ? gender === "female" ? "text-gb-darkest" : "text-gb-dark"
                    : gender === "female" ? "text-pink-400" : "text-gray-300"
                } text-[25px]`}
                style={{ WebkitTextStroke: "1px currentColor", textShadow: "0 0 0 currentColor" }}
              >
                ♀
              </button>
            </div>
          )}
        </div>
      <div className="flex justify-center my-4 mx-auto w-full">
        <SpriteViewer 
          pokemon={pokemon}
          gameVersion={gameVersion}
          shiny={shiny}
          gender={gender}
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

      {/* Evolution Chain */}
      {evolutionData && evolutionData.chain.evolves_to.length > 0 && (
        <EvolutionChain data={evolutionData} isRetro={isRetro} />
      )}

      {/* Stats */}
      <StatsPanel stats={pokemon.stats} isRetro={isRetro} pokemonId={pokemon.id} />

      {flavorOpen && species && (
        <FlavorTextPopup
          species={species}
          language={language}
          gameVersion={gameVersion}
          isRetro={isRetro}
          pokemonId={pokemon.id}
          onClose={() => setFlavorOpen(false)}
        />
      )}
      </div>
    </div>
  );
}
