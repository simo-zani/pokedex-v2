import { useNavigate } from "react-router-dom";
import { formatPokemonNumber, getRetroListSpriteUrl, getListSpriteUrl } from "../../lib/constants";
import { useTheme } from "../../hooks/useTheme";
import type { PokemonListItemWithId } from "../../lib/types";

interface PokemonCardProps {
  pokemon: PokemonListItemWithId;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const navigate = useNavigate();
  const { isRetro } = useTheme();

  return (
    <button
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      className={`flex flex-col items-center justify-center p-1 bg-transparent cursor-pointer aspect-square w-full ${
        isRetro
          ? "[transition:all_0.1s_steps(3,end)]"
          : "transition-all duration-150 rounded-xl hover:bg-gray-100 active:scale-95"
      }`}
    >
      <img
        src={isRetro ? getRetroListSpriteUrl(pokemon.id) : getListSpriteUrl(pokemon.id)}
        alt={pokemon.name}
        loading="lazy"
        width={80}
        height={80}
        className={`w-20 h-20 object-contain ${isRetro ? "gb-sprite-filter" : ""}`}
      />
      <span className={`mt-0.5 ${
        isRetro
          ? "text-[8px] text-gb-dark font-retro"
          : "text-[10px] text-gray-400"
      }`}>
        {formatPokemonNumber(pokemon.id)}
      </span>
      <span className={`capitalize mt-0.5 leading-tight text-center break-all ${
        isRetro
          ? "text-[8px] font-retro text-gb-darkest"
          : "text-xs font-medium text-gray-800"
      }`}>
        {pokemon.name}
      </span>
    </button>
  );
}
