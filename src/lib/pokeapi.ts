import type { Pokemon, PokemonListResponse, PokemonSpecies } from "./types";
import { POKEAPI_BASE, POKEMON_LIST_LIMIT } from "./constants";

/**
 * Fetch the full list of Pokémon (name + url).
 * We request all at once to enable client-side search.
 */
export async function fetchPokemonList(): Promise<PokemonListResponse> {
  const res = await fetch(
    `${POKEAPI_BASE}/pokemon?limit=${POKEMON_LIST_LIMIT}&offset=0`
  );
  if (!res.ok) throw new Error(`PokéAPI list error: ${res.status}`);
  return res.json();
}

/**
 * Fetch a single Pokémon detail by ID or name.
 */
export async function fetchPokemon(idOrName: string | number): Promise<Pokemon> {
  const res = await fetch(`${POKEAPI_BASE}/pokemon/${idOrName}`);
  if (!res.ok) throw new Error(`PokéAPI pokemon error: ${res.status}`);
  return res.json();
}

/**
 * Fetch Pokémon species data (for localized names, flavor text, etc.).
 */
export async function fetchPokemonSpecies(
  id: string | number
): Promise<PokemonSpecies> {
  const res = await fetch(`${POKEAPI_BASE}/pokemon-species/${id}`);
  if (!res.ok) throw new Error(`PokéAPI species error: ${res.status}`);
  return res.json();
}
