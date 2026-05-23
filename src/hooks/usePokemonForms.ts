import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchPokemon } from "../lib/pokeapi";
import { extractIdFromUrl } from "../lib/constants";
import type { PokemonSpecies, Pokemon } from "../lib/types";
import { getFormInfo, isAltForm, type FormInfo } from "../lib/forms";

export interface FormEntry {
  pokemon: Pokemon;
  formInfo: FormInfo;
}

export function usePokemonForms(species: PokemonSpecies | undefined, baseItalianName: string) {
  const varieties = species?.varieties?.filter(v => !v.is_default) ?? [];
  const baseSpeciesName = species?.name ?? "";

  const results = useQueries({
    queries: varieties.map(v => ({
      queryKey: ["pokemon", extractIdFromUrl(v.pokemon.url)],
      queryFn: () => fetchPokemon(extractIdFromUrl(v.pokemon.url)),
      staleTime: Infinity,
      gcTime: Infinity,
      enabled: !!species && varieties.length > 0,
    })),
  });

  const forms: FormEntry[] = results
    .filter(r => r.data)
    .map(r => ({
      pokemon: r.data!,
      formInfo: getFormInfo(r.data!.name, baseSpeciesName, baseItalianName),
    }));

  const isLoading = results.some(r => r.isLoading);
  const hasForms = varieties.length > 0;

  return { forms, isLoading, hasForms };
}

// Fetch the default (base) form's Pokemon data — used when viewing an alternate form
export function useDefaultFormPokemon(species: PokemonSpecies | undefined, currentPokemonName: string | undefined) {
  const isAlt = species && currentPokemonName
    ? isAltForm(currentPokemonName, species.varieties)
    : false;

  const defaultVariety = species?.varieties?.find(v => v.is_default);
  const defaultId = defaultVariety ? extractIdFromUrl(defaultVariety.pokemon.url) : null;

  return useQuery<Pokemon>({
    queryKey: ["pokemon", "default-form", defaultId],
    queryFn: () => fetchPokemon(defaultId!),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: isAlt && defaultId !== null,
  });
}
