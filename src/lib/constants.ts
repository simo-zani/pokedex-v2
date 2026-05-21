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

/** Get sprite URL for list display */
export function getListSpriteUrl(id: number): string {
  return `${SPRITE_BASE}/${id}.png`;
}

/** Get retro (oldest available) sprite URL. */
export function getRetroListSpriteUrl(id: number): string {
  if (id <= 151) {
    // Gen I: red-blue gray
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/gray/${id}.png`;
  }
  if (id <= 251) {
    // Gen II: gold
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/${id}.png`;
  }
  if (id <= 386) {
    // Gen III: ruby-sapphire
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/${id}.png`;
  }
  if (id <= 493) {
    // Gen IV: diamond-pearl
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/${id}.png`;
  }
  if (id <= 649) {
    // Gen V: black-white
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${id}.png`;
  }
  if (id <= 721) {
    // Gen VI: x-y
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/${id}.png`;
  }
  if (id <= 809) {
    // Gen VII: ultra-sun-ultra-moon
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${id}.png`;
  }
  // Gen VIII+ or fallback: standard sprite
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

export type GameVersionKey =
  | "red-blue"
  | "yellow"
  | "gold"
  | "silver"
  | "crystal"
  | "ruby-sapphire"
  | "emerald"
  | "fire-red-leaf-green"
  | "diamond-pearl"
  | "platinum"
  | "heart-gold-soul-silver"
  | "black-white"
  | "black-2-white-2"
  | "x-y"
  | "omegaruby-alphasapphire"
  | "sun-moon"
  | "ultra-sun-ultra-moon"
  | "lets-go-pikachu-lets-go-eevee"
  | "sword-shield"
  | "brilliant-diamond-shining-pearl"
  | "legends-arceus"
  | "scarlet-violet";

export const GAME_VERSIONS_ORDERED: GameVersionKey[] = [
  "red-blue",
  "yellow",
  "gold",
  "silver",
  "crystal",
  "ruby-sapphire",
  "emerald",
  "fire-red-leaf-green",
  "diamond-pearl",
  "platinum",
  "heart-gold-soul-silver",
  "black-white",
  "black-2-white-2",
  "x-y",
  "omegaruby-alphasapphire",
  "sun-moon",
  "ultra-sun-ultra-moon",
  "lets-go-pikachu-lets-go-eevee",
  "sword-shield",
  "brilliant-diamond-shining-pearl",
  "legends-arceus",
  "scarlet-violet",
];
