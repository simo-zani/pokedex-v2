export const POKEAPI_BASE = "https://pokeapi.co/api/v2";

export const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

/** Total Pokémon to fetch from list (gen 1-9) */
export const POKEMON_LIST_LIMIT = 1025;

/** Extract numeric ID from a PokéAPI resource URL */
export function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  if (!match?.[1]) throw new Error(`Cannot extract ID from URL: ${url}`);
  return parseInt(match[1], 10);
}

/** Format Pokémon number as #001 */
export function formatPokemonNumber(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}

/** Get sprite URL for list display (avoids fetching detail) */
export function getListSpriteUrl(id: number): string {
  return `${SPRITE_BASE}/${id}.png`;
}

/** Get retro (Gen I gray) sprite URL for list display. Falls back to default for id > 151 */
export function getRetroListSpriteUrl(id: number): string {
  if (id <= 151) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/gray/${id}.png`;
  }
  return `${SPRITE_BASE}/${id}.png`;
}

/** Stat display names */
export const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Atk",
  defense: "Def",
  "special-attack": "SpAtk",
  "special-defense": "SpDef",
  speed: "Spe",
};
