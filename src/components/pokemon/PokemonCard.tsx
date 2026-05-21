import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPokemonNumber, getRetroListSpriteUrl, getListSpriteUrl } from "../../lib/constants";
import { useTheme } from "../../hooks/useTheme";
import type { PokemonListItemWithId } from "../../lib/types";

interface PokemonCardProps {
  pokemon: PokemonListItemWithId;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const navigate = useNavigate();
  const { isRetro } = useTheme();

  if (isRetro) {
    return (
      <button
        onClick={() => navigate(`/pokemon/${pokemon.id}`)}
        className="flex flex-col items-center justify-center p-1 bg-transparent cursor-pointer aspect-square w-full [transition:all_0.1s_steps(3,end)]"
      >
        <img
          src={getRetroListSpriteUrl(pokemon.id)}
          alt={pokemon.name}
          loading="lazy"
          width={80}
          height={80}
          className="w-20 h-20 object-contain gb-sprite-filter"
        />
        <span className="mt-0.5 text-[8px] text-gb-dark font-retro">
          {formatPokemonNumber(pokemon.id)}
        </span>
        <span className="capitalize mt-0.5 leading-tight text-center break-all text-[8px] font-retro text-gb-darkest">
          {pokemon.name}
        </span>
      </button>
    );
  }

  return (
    <motion.button
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      className="flex flex-col items-center justify-center p-1 bg-transparent cursor-pointer aspect-square w-full rounded-xl"
      whileHover={{ backgroundColor: "rgba(0,0,0,0.04)" }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <img
        src={getListSpriteUrl(pokemon.id)}
        alt={pokemon.name}
        loading="lazy"
        width={80}
        height={80}
        className="w-20 h-20 object-contain"
      />
      <span className="mt-0.5 text-[10px] text-gray-400">
        {formatPokemonNumber(pokemon.id)}
      </span>
      <span className="capitalize mt-0.5 leading-tight text-center break-all text-xs font-medium text-gray-800">
        {pokemon.name}
      </span>
    </motion.button>
  );
}
