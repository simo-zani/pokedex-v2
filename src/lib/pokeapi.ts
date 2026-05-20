import type { Pokemon, PokemonListResponse, PokemonSpecies } from "./types";
import { POKEAPI_BASE, POKEMON_LIST_LIMIT } from "./constants";

export async function fetchPokemonList(): Promise<PokemonListResponse> {
  const res = await fetch(
    `${POKEAPI_BASE}/pokemon?limit=${POKEMON_LIST_LIMIT}&offset=0`
  );
  if (!res.ok) throw new Error(`PokéAPI list error: ${res.status}`);
  return res.json();
}

export async function fetchPokemon(idOrName: string | number): Promise<Pokemon> {
  const res = await fetch(`${POKEAPI_BASE}/pokemon/${idOrName}`);
  if (!res.ok) throw new Error(`PokéAPI pokemon error: ${res.status}`);
  return res.json();
}

export async function fetchPokemonSpecies(
  id: string | number
): Promise<PokemonSpecies> {
  const res = await fetch(`${POKEAPI_BASE}/pokemon-species/${id}`);
  if (!res.ok) throw new Error(`PokéAPI species error: ${res.status}`);
  return res.json();
}
