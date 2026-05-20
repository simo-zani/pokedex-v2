import { useQuery } from "@tanstack/react-query";
import { fetchPokemon, fetchPokemonSpecies } from "../lib/pokeapi";
import type { Pokemon, PokemonSpecies } from "../lib/types";

export function usePokemon(id: string) {
  return useQuery<Pokemon>({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemon(id),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!id,
  });
}

export function usePokemonSpecies(id: string) {
  return useQuery<PokemonSpecies>({
    queryKey: ["pokemon-species", id],
    queryFn: () => fetchPokemonSpecies(id),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!id,
  });
}
