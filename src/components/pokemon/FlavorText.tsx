import type { PokemonSpecies } from "../../lib/types";
import { gameVersionToApiNames } from "../../lib/constants";
import { getDefaultRetroGame, GAME_VERSION_LABELS } from "../../lib/sprites";

interface FlavorTextPopupProps {
  species: PokemonSpecies;
  language: string;
  gameVersion: string;
  isRetro: boolean;
  pokemonId: number;
  onClose: () => void;
}

function cleanFlavorText(text: string): string {
  return text.replace(/[\f\n\r\u000c]/g, " ").replace(/\s+/g, " ").trim();
}

export function getFlavorTextEntry(
  species: PokemonSpecies,
  language: string,
  gameVersion: string,
  isRetro: boolean,
  pokemonId: number
): { text: string; gameLabel: string } | null {
  const currentGame = isRetro ? getDefaultRetroGame(pokemonId) : gameVersion;
  const apiNames = gameVersionToApiNames(currentGame);

  const entry = species.flavor_text_entries.find(
    (e) => e.language.name === language && apiNames.includes(e.version.name)
  );

  if (!entry) return null;

  return {
    text: cleanFlavorText(entry.flavor_text),
    gameLabel: GAME_VERSION_LABELS[currentGame as keyof typeof GAME_VERSION_LABELS] ?? currentGame,
  };
}

export default function FlavorTextPopup({ species, language, gameVersion, isRetro, pokemonId, onClose }: FlavorTextPopupProps) {
  const info = getFlavorTextEntry(species, language, gameVersion, isRetro, pokemonId);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed z-50 inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div className={`pointer-events-auto max-w-md w-full rounded-2xl shadow-2xl p-5 ${
          isRetro
            ? "bg-gb-bg border border-gb-dark"
            : "bg-white/95 backdrop-blur-md border border-gray-100"
        }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`uppercase tracking-wider ${
              isRetro ? "text-[8px] font-retro text-gb-darkest" : "text-base font-modern text-gray-700 font-bold"
            }`}>
              {isRetro ? "INFO POKÉDEX" : "Descrizione Pokédex"}
            </h3>
            <button
              onClick={onClose}
              className={`p-1 rounded-full transition-colors ${
                isRetro ? "text-gb-dark hover:text-gb-darkest" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {info ? (
            <>
              <p className={`leading-relaxed font-semibold ${
                isRetro
                  ? "text-[8px] font-retro text-gb-darkest"
                  : "text-sm font-modern text-gray-600"
              }`}>
                {info.text}
              </p>
              <p className={`mt-3 font-normal ${
                isRetro
                  ? "text-[6px] font-retro text-gb-dark"
                  : "text-xs font-modern text-gray-400"
              }`}>
                {info.gameLabel}
              </p>
            </>
          ) : (
            <p className={`italic ${
              isRetro ? "text-[8px] font-retro text-gb-dark" : "text-sm font-modern text-gray-400"
            }`}>
              Nessuna descrizione disponibile per questa lingua e gioco.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
