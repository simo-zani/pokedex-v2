import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../lib/pokeapi";
import { extractIdFromUrl } from "../lib/constants";
import type { PokemonListItemWithId } from "../lib/types";

export function usePokemonList() {
  return useQuery({
    queryKey: ["pokemon-list"],
    queryFn: async (): Promise<PokemonListItemWithId[]> => {
      const data = await fetchPokemonList();
      return data.results.map((item) => ({
        ...item,
        id: extractIdFromUrl(item.url),
      }));
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
