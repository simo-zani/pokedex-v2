import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage, getLocalizedName } from "../../hooks/useLanguage";
import TransparentSprite from "./TransparentSprite";
import { getDefaultRetroGame, mapGameVersionToSpritePath } from "../../lib/sprites";
import type { Pokemon, PokemonSpecies } from "../../lib/types";
import type { FormEntry } from "../../hooks/usePokemonForms";

const spriteBase = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

function getRetroSpriteUrl(id: number): string {
  const game = getDefaultRetroGame(id);
  if (game === "default") {
    return `${spriteBase}/${id}.png`;
  }
  const info = mapGameVersionToSpritePath(game);
  if (!info) {
    return `${spriteBase}/${id}.png`;
  }
  return `${spriteBase}/versions/${info.gen}/${info.game}/${id}.png`;
}

interface AlternativeFormsProps {
  forms: FormEntry[];
  isLoading: boolean;
  isDefaultForm: boolean;
  baseFormPokemon?: Pokemon | null;
  baseFormSpecies?: PokemonSpecies | null;
}

export default function AlternativeForms({ forms, isLoading, isDefaultForm, baseFormPokemon, baseFormSpecies }: AlternativeFormsProps) {
  const navigate = useNavigate();
  const { isRetro } = useTheme();
  const { language } = useLanguage();

  if (!forms.length && !baseFormPokemon) return null;

  const renderSprite = (pokemon: Pokemon, extraClass = "") => {
    if (isRetro) {
      return (
        <TransparentSprite
          src={getRetroSpriteUrl(pokemon.id)}
          alt={pokemon.name}
          width={64}
          height={64}
          className={extraClass}
        />
      );
    }
    const artwork = pokemon.sprites.other?.["official-artwork"]?.front_default;
    return (
      <img
        src={artwork ?? `${spriteBase}/other/official-artwork/${pokemon.id}.png`}
        alt={pokemon.name}
        className={`w-16 h-16 object-contain pixelated ${extraClass}`}
      />
    );
  };

  const renderCard = (pokemon: Pokemon, title: string, subtitle: string, onClick: () => void) => (
    <button
      key={pokemon.id}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors cursor-pointer
        ${isRetro
          ? "hover:bg-gb-light active:bg-gb-light"
          : "hover:bg-gray-100 active:bg-gray-100"
        }`}
    >
      {renderSprite(pokemon)}
      <span className={`text-center leading-tight ${
        isRetro ? "text-[7px] font-retro text-gb-darkest" : "text-[11px] font-modern text-gray-700"
      }`}>
        {title}
      </span>
      <span className={`text-center leading-tight ${
        isRetro ? "text-[6px] font-retro text-gb-dark" : "text-[9px] font-modern text-gray-400"
      }`}>
        {subtitle}
      </span>
    </button>
  );

  return (
    <div className="mt-4">
      {/* Title: "Forme alternative" for default, "Altre forme alternative" for alt form with no base card */}
      {forms.length > 0 && (
        <h2 className={`text-center mb-2 ${
          isRetro
            ? "text-[8px] font-retro text-gb-darkest tracking-wider"
            : "text-sm font-bold text-gray-700 tracking-wide"
        }`}>
          {isDefaultForm ? "Forme alternative" : "Altre forme alternative"}
        </h2>
      )}

      <div className="flex flex-wrap justify-center gap-1">
        {/* Base form card — only when viewing an alt form that has no evolution chain */}
        {baseFormPokemon && baseFormSpecies && (() => {
          const baseItalianName = getLocalizedName(baseFormSpecies, language) ?? baseFormPokemon.name;
          return (
            <div className="w-full mb-1">
              <h3 className={`text-center ${
                isRetro
                  ? "text-[7px] font-retro text-gb-dark"
                  : "text-[10px] font-modern text-gray-400"
              }`}>
                Forma base
              </h3>
              <div className="flex justify-center mt-1">
                {renderCard(
                  baseFormPokemon,
                  baseItalianName,
                  "Forma base",
                  () => navigate(`/pokemon/${baseFormPokemon.id}`)
                )}
              </div>
            </div>
          );
        })()}

        {isLoading && forms.length === 0 && (
          <span className={`${isRetro ? "text-[7px] font-retro text-gb-dark" : "text-xs text-gray-400"}`}>
            Caricamento...
          </span>
        )}
        {forms.map((form) => (
          renderCard(
            form.pokemon,
            form.formInfo.title,
            form.formInfo.subtitle,
            () => navigate(`/pokemon/${form.pokemon.id}`)
          )
        ))}
      </div>
    </div>
  );
}
